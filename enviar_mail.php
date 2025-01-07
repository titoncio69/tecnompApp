<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = htmlspecialchars(trim($_POST['your-name']));
    $email = htmlspecialchars(trim($_POST['your-email']));
    $fono = htmlspecialchars(trim($_POST['fono']));
    $asunto = htmlspecialchars(trim($_POST['your-subject']));
    $mensaje = htmlspecialchars(trim($_POST['your-message']));

    // Validar los datos
    $errores = [];
    if (empty($nombre)) {
        $errores[] = "El nombre es obligatorio.";
    }
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errores[] = "Se requiere un correo electrónico válido.";
    }
    if (empty($fono)) {
        $errores[] = "El número de teléfono es obligatorio.";
    }
    if (empty($asunto)) {
        $errores[] = "El asunto es obligatorio.";
    }
    if (empty($mensaje)) {
        $errores[] = "El mensaje es obligatorio.";
    }

    // Si no hay errores, envía el correo
    if (empty($errores)) {
        $destinatario = "matias.pintoc@mail.udp.cl"; // Cambia esto por tu dirección de correo
        $headers = "From: $email\r\n";
        $headers .= "Reply-To: $email\r\n";
        $headers .= "Content-Type: text/html; charset=UTF-8\r\n";

        // Prepara el cuerpo del correo
        $cuerpo = "<h2>Formulario de Contacto</h2>
                   <p><strong>Nombre:</strong> $nombre</p>
                   <p><strong>Email:</strong> $email</p>
                   <p><strong>Teléfono:</strong> $fono</p>
                   <p><strong>Asunto:</strong> $asunto</p>
                   <p><strong>Mensaje:</strong><br>$mensaje</p>";

        // Envía el correo
        if (mail($destinatario, $asunto, $cuerpo, $headers)) {
            header('Location: gracias.html'); // Redirige a una página de agradecimiento
            exit();
        } else {
            echo "Error al enviar el correo.";
        }
    } else {
        // Muestra los errores
        foreach ($errores as $error) {
            echo "<p style='color:red;'>$error</p>";
        }
    }
}
?>
