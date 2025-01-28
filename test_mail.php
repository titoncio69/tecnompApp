<?php
$to = "dmarambio@tecnomp.net";
$subject = "Correo de prueba";
$message = "Este es un correo de prueba enviado desde PHP.";
$headers = "From: test@localhost";

if (mail($to, $subject, $message, $headers)) {
    echo "Correo enviado correctamente.";
} else {
    echo "Error al enviar el correo.";
}
?>
