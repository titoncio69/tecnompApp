<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $to = "formulario@tecnomp.cl";
    $from = "formularioweb@tecnomp.cl";

    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $subject = htmlspecialchars($_POST['subject']);
    $message = htmlspecialchars($_POST['message']);

    // Generar código de seguimiento
    $timestamp = date("YmdHis"); // Formato YYYYMMDDHHmmSS
    $code = strtoupper(substr(preg_replace("/[^A-Za-z0-9]/", "", $subject), 0, 6)); // Extraer primeras 6 letras/números del asunto
    $nameCode = strtoupper(substr(preg_replace("/[^A-Za-z0-9]/", "", $name), 0, 4)); // Extraer primeras 4 letras del nombre
    $tracking_code = "{$code}{$timestamp}-{$nameCode}";
    $hash_tracking_code = hash("sha256", $tracking_code); // Aplica SHA-256 para seguridad

    $headers = "From: $from\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "MIME-Version: 1.0\r\n";

    $boundary = md5(time());
    $headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";

    // Cuerpo del email
    $email_body = "--$boundary\r\n";
    $email_body .= "Content-Type: text/html; charset=UTF-8\r\n";
    $email_body .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
    $email_body .= "<html><body>";
    $email_body .= "<h2>Nuevo mensaje de contacto</h2>";
    $email_body .= "<p><strong>Nombre:</strong> $name</p>";
    $email_body .= "<p><strong>Correo Electrónico:</strong> $email</p>";
    $email_body .= "<p><strong>Asunto:</strong> $subject</p>";
    $email_body .= "<p><strong>Mensaje:</strong></p><p>$message</p>";
    $email_body .= "<p><strong>Código de Seguimiento:</strong> $hash_tracking_code</p>";
    $email_body .= "</body></html>\r\n";

    // Adjuntar archivo si existe
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

    // Envío del email
    if (mail($to, "Nuevo mensaje de contacto - Seguimiento: $hash_tracking_code", $email_body, $headers)) {
        echo json_encode(["status" => "success", "tracking_code" => $hash_tracking_code]);
    } else {
        echo json_encode(["status" => "error", "message" => "Error al enviar correo"]);
    }
} else {
    http_response_code(405);
}
?>
