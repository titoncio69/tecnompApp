document.getElementById("contactForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  alert(`Gracias, ${name}. Hemos recibido tu mensaje y te contactaremos pronto.`);
  
  // Aquí podrías enviar los datos a un servidor usando fetch
  console.log({ name, email, message });
});
