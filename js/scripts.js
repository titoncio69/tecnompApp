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
    const sendLocationButton = document.getElementById("send-location");

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
    if (hostnameField) {
        hostnameField.value = window.location.hostname || "Desconocido";
    }

    // Mostrar/ocultar menú de navegación en móvil
    if (navbarToggler && navbarMenu) {
        navbarToggler.addEventListener('click', () => {
            navbarMenu.classList.toggle('show');
        });

        navbarMenu.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                navbarMenu.classList.remove('show');
            }
        });
    }

    // Mostrar el botón al hacer scroll hacia abajo
    window.addEventListener('scroll', function () {
        if (window.scrollY > 100) {
            scrollToTop.classList.add('show');
        } else {
            scrollToTop.classList.remove('show');
        }
    });

    // Botón de scroll al inicio
    if (scrollToTop) {
        scrollToTop.addEventListener('click', function (e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        });
    }

    // Galería de clientes
    if (viewGalleryBtn && clientGallery) {
        viewGalleryBtn.addEventListener('click', () => {
            clientGallery.style.display = 'flex';
            showImage(currentIndex);
        });

        if (closeGalleryBtn) {
            closeGalleryBtn.addEventListener('click', () => {
                clientGallery.style.display = 'none';
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', navigateLeft);
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', navigateRight);
        }

        function showImage(index) {
            if (galleryImage && clientName) {
                galleryImage.src = clients[index].image;
                clientName.textContent = clients[index].name;
            }
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
    }

    document.getElementById("send-location").addEventListener("click", function () {
        const password = prompt("Ingrese la contraseña de trabajador:");
    
        if (password === "777") {
            const userName = prompt("Ingrese su nombre:");
    
            if (userName) {
                alert("Contraseña correcta. Enviando ubicación...");
    
                // Aquí puedes incluir la lógica para enviar la ubicación:
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                        (position) => {
                            const latitude = position.coords.latitude;
                            const longitude = position.coords.longitude;
    
                            const data = {
                                name: userName, // Nombre del usuario
                                latitude: latitude,
                                longitude: longitude,
                                user: "Trabajador Autorizado", // Cambia esto si es necesario
                            };
    
                            // Enviar la ubicación al servidor
                            fetch("send_location.php", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify(data),
                            })
                                .then((response) => response.text())
                                .then((result) => {
                                    alert(result); // Mostrar respuesta del servidor
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
                alert("Por favor, ingresa tu nombre para continuar.");
            }
        } else {
            alert("Contraseña incorrecta. Acceso denegado.");
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const sendLocationButton = document.getElementById('send-location');
    const footer = document.querySelector('footer');

    function isAtBottom() {
        const scrollPosition = window.scrollY + window.innerHeight; // Posición actual del scroll
        const pageHeight = document.documentElement.scrollHeight; // Altura total de la página
        return scrollPosition >= pageHeight - footer.offsetHeight; // Verificar si llegó al final
    }

    function adjustButtonVisibility() {
        if (isAtBottom()) {
            sendLocationButton.style.display = 'block'; // Mostrar botón
        } else {
            sendLocationButton.style.display = 'none'; // Ocultar botón
        }
    }

    // Evento de scroll para mostrar/ocultar el botón
    window.addEventListener('scroll', adjustButtonVisibility);

    // También verificar al cargar la página
    adjustButtonVisibility();
});

document.addEventListener('DOMContentLoaded', function () {
    // Inicia el carrusel automáticamente tan pronto como se cargue la página
    var myCarousel = document.getElementById('inicio-carousel');
    var carousel = new bootstrap.Carousel(myCarousel, {
        interval: 3000, // Intervalo en milisegundos (3 segundos)
        ride: 'carousel' // Hace que el carrusel empiece automáticamente
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // Manejo del formulario
    document.getElementById('contact-form').addEventListener('submit', function (e) {
        e.preventDefault(); // Evita que el formulario recargue la página

        const formData = new FormData(this); // Obtiene los datos del formulario
        const fileInput = document.getElementById('attachment'); // Campo del archivo adjunto
        const maxFileSize = 2 * 1024 * 1024; // 2MB en bytes

        // Validar tamaño del archivo
        if (fileInput.files[0] && fileInput.files[0].size > maxFileSize) {
            const successMessage = document.getElementById('success-message');
            successMessage.style.display = 'block';
            successMessage.style.backgroundColor = '#dc3545'; // Cambia a rojo
            successMessage.innerHTML = '<strong>El archivo es mayor a 2MB. No se envió el mensaje.</strong>';

            // Oculta el mensaje después de 5 segundos
            setTimeout(() => {
                successMessage.style.display = 'none';
                successMessage.style.backgroundColor = '#28a745'; // Vuelve al verde original
            }, 5000);

            return; // Salir y no enviar el formulario
        }

        fetch(this.action, { // Envía el formulario al archivo PHP
            method: 'POST',
            body: formData,
        })
            .then(response => response.json()) // Cambiar a JSON
            .then(data => {
                const successMessage = document.getElementById('success-message');
                successMessage.style.display = 'block'; // Hace visible el mensaje
                successMessage.textContent = data.message || 'Mensaje enviado correctamente'; // Extrae solo el mensaje del servidor

                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 5000);
            })
            .catch(error => {
                console.error('Error:', error);

                const successMessage = document.getElementById('success-message');
                successMessage.style.display = 'block';
                successMessage.style.backgroundColor = '#dc3545'; // Cambia a rojo
                successMessage.innerHTML = '<strong>Hubo un error al enviar el mensaje. Inténtalo nuevamente.</strong>';

                setTimeout(() => {
                    successMessage.style.display = 'none';
                    successMessage.style.backgroundColor = '#28a745'; // Vuelve al verde original
                }, 5000);
            });
    });

    // Mostrar el botón "Eliminar archivo" cuando se seleccione un archivo
    document.getElementById('attachment').addEventListener('change', function () {
        const removeFileButton = document.getElementById('remove-file');
        if (this.files[0]) {
            removeFileButton.style.display = 'inline-block'; // Muestra el botón
        } else {
            removeFileButton.style.display = 'none'; // Oculta el botón si no hay archivo
        }
    });

    // Eliminar el archivo adjunto
    document.getElementById('remove-file').addEventListener('click', function () {
        const fileInput = document.getElementById('attachment');
        fileInput.value = ''; // Limpia el valor del input de archivo
        this.style.display = 'none'; // Oculta el botón de eliminar
        alert('El archivo adjunto ha sido eliminado.'); // Mensaje para el usuario
    });
});


