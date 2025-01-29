<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $to = "formulario@tecnomp.cl";
    $from = "formularioweb@tecnomp.cl";

    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $subject = htmlspecialchars($_POST['subject']);
    $message = htmlspecialchars($_POST['message']);

    $headers = "From: $from\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "MIME-Version: 1.0\r\n";

    $boundary = md5(time());
    $headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";

    $email_body = "--$boundary\r\n";
    $email_body .= "Content-Type: text/html; charset=UTF-8\r\n";
    $email_body .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
    $email_body .= "<html><body>";
    $email_body .= "<h2>Nuevo mensaje de contacto</h2>";
    $email_body .= "<p><strong>Nombre:</strong> $name</p>";
    $email_body .= "<p><strong>Correo Electrónico:</strong> $email</p>";
    $email_body .= "<p><strong>Asunto:</strong> $subject</p>";
    $email_body .= "<p><strong>Mensaje:</strong></p><p>$message</p>";
    $email_body .= "</body></html>\r\n";

    if (!empty($_FILES['file']['tmp_name'])) {
        $file = $_FILES['file']['tmp_name'];
        $file_name = $_FILES['file']['name'];
        $file_type = $_FILES['file']['type'];
        $file_content = chunk_split(base64_encode(file_get_contents($file)));

        $email_body .= "--$boundary\r\n";
        $email_body .= "Content-Type: $file_type; name=\"$file_name\"\r\n";
        $email_body .= "Content-Disposition: attachment; filename=\"$file_name\"\r\n";
        $email_body .= "Content-Transfer-Encoding: base64\r\n\r\n";
        $email_body .= $file_content . "\r\n";
    }

    $email_body .= "--$boundary--";

    if (mail($to, "Nuevo mensaje de contacto", $email_body, $headers)) {
        echo json_encode(["status" => "success"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Error al enviar correo"]);
    }
} else {
    http_response_code(405);
}
?>
