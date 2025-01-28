<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $subject = htmlspecialchars($_POST['subject']);
    $message = htmlspecialchars($_POST['message']);
    $userIp = htmlspecialchars($_POST['user_ip']);
    $userHostname = htmlspecialchars($_POST['user_hostname']);
    $to = "matias.pintoc@mail.udp.cl"; // Correo de destino
    $from = "formularioweb@tecnomp.cl"; // Correo del remitente

    // Verificar si el archivo adjunto está presente y validar su tamaño
    $fileSize = isset($_FILES['attachment']) ? $_FILES['attachment']['size'] : 0;
    if ($fileSize > 2 * 1024 * 1024) {
        // Si el archivo excede los 2MB, muestra el mensaje de error
        echo "El archivo excede el tamaño máximo permitido de 2MB. Por favor, adjunta un archivo más pequeño.";
        exit; // Evita que se continúe con el envío
    }

    // Geolocalización
    $geoLocation = "No disponible";
    try {
        $response = file_get_contents("https://ipinfo.io/{$userIp}/json");
        if ($response) {
            $data = json_decode($response, true);
            $geoLocation = $data['city'] . ', ' . $data['region'] . ', ' . $data['country'];
            $geoMapLink = "https://www.google.com/maps?q={$data['loc']}";
        }
    } catch (Exception $e) {
        $geoLocation = "No se pudo obtener la ubicación.";
        $geoMapLink = "#";
    }

    // Preparar el correo
    $boundary = md5(time());
    $headers = "From: $from\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "MIME-Version: 1.0\r\n";

    // Si hay un archivo adjunto, preparar el correo con el archivo
    if (isset($_FILES['attachment']) && $_FILES['attachment']['error'] === UPLOAD_ERR_OK) {
        $fileTmpPath = $_FILES['attachment']['tmp_name'];
        $fileName = $_FILES['attachment']['name'];
        $fileType = $_FILES['attachment']['type'];

        $fileContent = chunk_split(base64_encode(file_get_contents($fileTmpPath)));

        $headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";

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

        $body .= "--$boundary\r\n";
        $body .= "Content-Type: $fileType; name=\"$fileName\"\r\n";
        $body .= "Content-Transfer-Encoding: base64\r\n";
        $body .= "Content-Disposition: attachment; filename=\"$fileName\"\r\n\r\n";
        $body .= $fileContent . "\r\n";
        $body .= "--$boundary--";
    } else {
        // Si no hay archivo, enviar solo el mensaje
        $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

        $body = "Nombre: $name\n";
        $body .= "Correo: $email\n";
        $body .= "Asunto: $subject\n";
        $body .= "Mensaje: $message\n";
        $body .= "IP del Emisor: $userIp\n";
        $body .= "Hostname del Emisor: $userHostname\n";
        $body .= "Ubicación: $geoLocation\n";
        $body .= "Mapa: $geoMapLink\n";
    }

    // Enviar el correo
    if (mail($to, $subject, $body, $headers)) {
        echo "Correo enviado exitosamente.";
    } else {
        echo "Error al enviar el correo.";
    }
} else {
    echo "Método no permitido.";
}
?>
