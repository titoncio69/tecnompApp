<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $subject = htmlspecialchars($_POST['subject']);
    $message = htmlspecialchars($_POST['message']);
    $userIp = htmlspecialchars($_POST['user_ip']);
    $userHostname = htmlspecialchars($_POST['user_hostname']);
    $to = "matias.pintoc@mail.udp.cl"; // Correo de destino
    $from = "formularioweb@tecnomp.cl"; // Correo del remitente

    // Geolocalización
    $geoLocation = "No disponible";
    $geoMapLink = "#";
    try {
        $response = file_get_contents("https://ipinfo.io/{$userIp}/json");
        if ($response) {
            $data = json_decode($response, true);
            $geoLocation = $data['city'] . ', ' . $data['region'] . ', ' . $data['country'];
            $geoMapLink = "https://www.google.com/maps?q={$data['loc']}";
        }
    } catch (Exception $e) {
        $geoLocation = "No se pudo obtener la ubicación.";
    }

    // Validación del archivo adjunto
    if (isset($_FILES['attachment']) && $_FILES['attachment']['error'] === UPLOAD_ERR_OK) {
        $fileTmpPath = $_FILES['attachment']['tmp_name'];
        $fileName = $_FILES['attachment']['name'];
        $fileSize = $_FILES['attachment']['size'];
        $fileType = $_FILES['attachment']['type'];

        if ($fileSize > 2 * 1024 * 1024) { // Si el archivo excede 2MB
            echo json_encode([
                "status" => "error",
                "message" => "El archivo es mayor a 2MB. No se pudo enviar el mensaje."
            ]);
            exit;
        }

        $fileContent = chunk_split(base64_encode(file_get_contents($fileTmpPath)));
    }

    // Configuración del correo
    $headers = "From: $from\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $boundary = md5(time());
    $headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";

    // Cuerpo del correo
    $body = "--$boundary\r\n";
    $body .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $body .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
    $body .= "Nombre: $name\n";
    $body .= "Correo: $email\n";
    $body .= "Asunto: $subject\n";
    $body .= "Mensaje: $message\n";
    $body .= "IP del Emisor: $userIp\n";
    $body .= "Hostname del Emisor: $userHostname\n";
    $body .= "Ubicación: $geoLocation\n";
    $body .= "Mapa: $geoMapLink\n";
    $body .= "\r\n";

    // Agregar el archivo al correo
    if (isset($fileContent)) {
        $body .= "--$boundary\r\n";
        $body .= "Content-Type: $fileType; name=\"$fileName\"\r\n";
        $body .= "Content-Transfer-Encoding: base64\r\n";
        $body .= "Content-Disposition: attachment; filename=\"$fileName\"\r\n\r\n";
        $body .= $fileContent . "\r\n";
    }

    // Finaliza el cuerpo del correo
    $body .= "--$boundary--";

    // Enviar el correo
    if (mail($to, $subject, $body, $headers)) {
        echo json_encode([
            "status" => "success",
            "message" => "Mensaje enviado correctamente."
        ]);
    } else {
        echo json_encode([
            "status" => "error",
            "message" => "Error al enviar el correo."
        ]);
    }
} else {
    echo json_encode([
        "status" => "error",
        "message" => "Método no permitido."
    ]);
}
?>
