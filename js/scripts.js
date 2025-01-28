document.addEventListener('DOMContentLoaded', function () {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarMenu = document.querySelector('#navbarNav');
    const scrollToTop = document.getElementById('scroll-to-top');
    const viewGalleryBtn = document.getElementById('view-gallery-btn');
    const clientGallery = document.getElementById('client-gallery');
    const closeGalleryBtn = document.getElementById('close-gallery-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const galleryImage = document.getElementById('gallery-image');
    const clientName = document.getElementById('client-name');
    const ipField = document.getElementById('user-ip'); // Campo oculto para la IP
    const hostnameField = document.getElementById('user-hostname'); // Campo oculto para el hostname

    const clients = [
        { name: "Red de Salud UC CHRISTUS", image: "images/uc.png" },
        { name: "Davila  Red de Salud", image: "images/davila.png" },
        { name: "INIA  Instituto de Investigaciones Agropecuarias", image: "images/inia.png" },
        { name: "UNAB  Universidad Andrés Bello", image: "images/unab.png" },
        { name: "Ingevec  Infraestructura y Desarrollo", image: "images/ingevec.jpg" },
        { name: "DDAF  Dirección de Deportes y Actividad Física", image: "images/udechile.jpg" },
        { name: "Rapak  Soluciones de Empaque", image: "images/rapak.jpg" },
        { name: "ROVIL  Empresa de Innovación", image: "images/rovil.png" },
        { name: "Bramal  Soluciones Metálicas", image: "images/bramal.jpeg" },
        { name: "Apromad  Desarrollo Agrícola", image: "images/apromad.jpeg" },
        { name: "Lycée Antoine de Saint-Exupéry", image: "images/ali.jpg" }
    ];
    
    let currentIndex = 0;

    // Obtener la IP pública
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            if (ipField) ipField.value = data.ip;
        })
        .catch(error => console.error('Error al obtener la IP:', error));

    // Obtener el hostname (nombre de la máquina)
    hostnameField.value = window.location.hostname || "Desconocido";

    // Mostrar/ocultar menú de navegación en móvil
    navbarToggler.addEventListener('click', () => {
        if (navbarMenu.classList.contains('show')) {
            navbarMenu.classList.remove('show');
        } else {
            navbarMenu.classList.add('show');
        }
    });

    navbarMenu.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            navbarMenu.classList.remove('show');
        }
    });

    // Mostrar el botón al hacer scroll hacia abajo
    window.addEventListener('scroll', function () {
        if (window.scrollY > 100) {
            scrollToTop.classList.add('show');
        } else {
            scrollToTop.classList.remove('show');
        }
    });

    scrollToTop.addEventListener('click', function (e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    });

    viewGalleryBtn.addEventListener('click', () => {
        clientGallery.style.display = 'flex';
        showImage(currentIndex);
    });

    closeGalleryBtn.addEventListener('click', () => {
        clientGallery.style.display = 'none';
    });

    prevBtn.addEventListener('click', navigateLeft);
    nextBtn.addEventListener('click', navigateRight);

    function showImage(index) {
        galleryImage.src = clients[index].image;
        clientName.textContent = clients[index].name;
    }

    function navigateLeft() {
        if (currentIndex > 0) {
            currentIndex--;
            showImage(currentIndex);
        }
    }

    function navigateRight() {
        if (currentIndex < clients.length - 1) {
            currentIndex++;
            showImage(currentIndex);
        }
    }

    document.addEventListener('keydown', (event) => {
        if (clientGallery.style.display === 'flex') {
            if (event.key === 'ArrowLeft') {
                navigateLeft();
            } else if (event.key === 'ArrowRight') {
                navigateRight();
            }
        }
    });

    clientGallery.addEventListener('click', (e) => {
        if (e.target === clientGallery) {
            clientGallery.style.display = 'none';
        }
    });
});


document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("send-location").addEventListener("click", function () {
        // Pedir la contraseña
        const password = prompt("Por favor ingresa la contraseña:");

        // Si la contraseña es correcta
        if (password === "777") {
            // Pedir el nombre del usuario
            const userName = prompt("¿Cuál es tu nombre?");
            
            // Pedir si es ingreso o salida
            const action = prompt("¿Es ingreso o salida? Por favor, ingresa 'INGRESO' o 'SALIDA' en MAYÚSCULAS.");

            // Comprobar si el tipo de acción es válido
            if (action.toLowerCase() === 'ingreso' || action.toLowerCase() === 'salida') {
                alert(`Nombre: ${userName}\nAcción: ${action}`);
                
                // Realiza el envío de la ubicación
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                        (position) => {
                            const data = {
                                latitude: position.coords.latitude,
                                longitude: position.coords.longitude,
                                user: userName, // Usamos el nombre del usuario ingresado
                                action: action // También incluimos la acción (ingreso/salida)
                            };

                            // Enviar las coordenadas al servidor
                            fetch("send_location.php", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify(data),
                            })
                            .then((response) => response.text())
                            .then((result) => {
                                const confirmationMessage = document.getElementById('confirmation-message');
                                confirmationMessage.style.display = 'block';
                                confirmationMessage.textContent = 'Ubicación enviada exitosamente.'; // Mensaje de éxito
                            })
                            .catch((error) => {
                                console.error("Error al enviar la ubicación:", error);
                            });
                        },
                        (error) => {
                            alert("Error al obtener la ubicación: " + error.message);
                        }
                    );
                } else {
                    alert("Tu navegador no soporta geolocalización.");
                }

            } else {
                alert("Por favor, ingresa 'INGRESO' o 'SALIDA' en MAYÚSCULAS.");
            }

        } else {
            // Contraseña incorrecta
            alert("Contraseña incorrecta. Intenta nuevamente.");
        }
    });
});




document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Evita que el formulario se recargue

    // Verificar tamaño del archivo antes de enviar
    const attachment = document.getElementById('attachment').files[0];
    if (attachment && attachment.size > 2 * 1024 * 1024) {
        const confirmationMessage = document.getElementById('confirmation-message');
        confirmationMessage.style.display = 'block';
        confirmationMessage.textContent = "El archivo excede el tamaño máximo permitido de 2MB. Por favor, adjunta un archivo más pequeño.";
        return; // Evita que el formulario se envíe
    }

    const formData = new FormData(this);

    fetch('send_email.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        const confirmationMessage = document.getElementById('confirmation-message');
        if (data.includes("Correo enviado exitosamente")) {
            // Muestra el mensaje en la página
            confirmationMessage.style.display = 'block';
            confirmationMessage.textContent = 'Mensaje enviado exitosamente.';
            // Limpia el formulario
            document.getElementById('contact-form').reset();
        } else {
            // Muestra el error si el archivo es demasiado grande
            confirmationMessage.style.display = 'block';
            confirmationMessage.textContent = data; // Muestra el mensaje de error
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Ocurrió un error al enviar el mensaje.');
    });
});

document.getElementById('attachment').addEventListener('change', function (e) {
    const fileInput = e.target;
    const removeButton = document.getElementById('remove-file');

    // Verifica si hay un archivo seleccionado
    if (fileInput.files.length > 0) {
        removeButton.style.display = 'inline-block';  // Muestra el botón para eliminar
    } else {
        removeButton.style.display = 'none';  // Oculta el botón si no hay archivo
    }
});

document.getElementById('remove-file').addEventListener('click', function () {
    const fileInput = document.getElementById('attachment');
    const removeButton = document.getElementById('remove-file');

    // Elimina el archivo seleccionado y oculta el botón
    fileInput.value = '';
    removeButton.style.display = 'none';
});

// Función para mostrar el botón solo cuando se llegue al final de la página
window.addEventListener('scroll', function () {
    const button = document.getElementById('send-location');
    
    // Verificamos si hemos llegado al final de la página
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        button.style.opacity = 1;  // Muestra el botón
    } else {
        button.style.opacity = 0;  // Oculta el botón
    }
});


