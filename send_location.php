<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Leer los datos enviados desde JavaScript
$data = json_decode(file_get_contents('php://input'), true);

$user = htmlspecialchars($data['user']);
$latitude = htmlspecialchars($data['latitude']);
$longitude = htmlspecialchars($data['longitude']);
$action = htmlspecialchars($data['action']); // Leer la acción (ingreso/salida)

// Generar enlace de Google Maps
$locationLink = "https://www.google.com/maps?q={$latitude},{$longitude}";

// Configurar el mensaje dependiendo de la acción
if ($action == 'INGRESO') {
    $messageBody = "<strong>Hola! Mariebert Soy {$user} y estoy ingresando a mi turno, te envío mi ubicación.</strong><br><br>";
} elseif ($action == 'SALIDA') {
    $messageBody = "<strong>Hola! Mariebert Soy {$user} y estoy saliendo de mi turno, te envío mi ubicación.</strong><br><br>";
} else {
    $messageBody = "<strong>El usuario {$user} ha enviado su ubicación.</strong><br><br>";
}

// Agregar la ubicación al mensaje
$messageBody .= "<strong>Latitud:</strong> $latitude<br>";
$messageBody .= "<strong>Longitud:</strong> $longitude<br>";
$messageBody .= "<strong>Mapa:</strong> <a href='$locationLink'>$locationLink</a><br>";

// Configurar correo
$to = "matias.pintoc@mail.udp.cl"; // Cambia esto por el correo de destino.
$subject = "Ubicación de $user";
$headers = "From: sistema@empresa.com\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8"; // Especifica que el correo es en HTML

// Enviar el correo
if (mail($to, $subject, $messageBody, $headers)) {
    echo "Ubicación enviada exitosamente.";
} else {
    echo "Error al enviar la ubicación.";
}
?>
