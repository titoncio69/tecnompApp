<?php
// Obtener datos de la solicitud
$data = json_decode(file_get_contents("php://input"), true);

$name = $data['name'] ?? 'Desconocido'; // Nombre del trabajador
$latitude = $data['latitude'];
$longitude = $data['longitude'];

// Crear el mensaje del correo
$subject = "Asistencia";
$message = "Saludos Mariebert! Soy $name y confirmo mi asistencia el día de hoy junto a mi ubicación!\n\n";
$message .= "Latitud: $latitude\n";
$message .= "Longitud: $longitude\n";
$message .= "Mapa: https://www.google.com/maps?q=$latitude,$longitude\n";

$message .= "Que tengas un gran día!\n\n";

// Configurar el destinatario y enviar el correo
$to = "matias.pintoc@mail.udp.cl"; // Cambia esto al correo destino
$headers = "From: asistencia@tecnomp.cl";

if (mail($to, $subject, $message, $headers)) {
    echo "Ubicación enviada correctamente.";
} else {
    echo "Error al enviar la ubicación.";
}
?>
