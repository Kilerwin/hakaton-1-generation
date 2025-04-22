document.getElementById("contactform").addEventListener("submit", function (e) {
  e.preventDefault(); 
  const input = document.getElementById("inputemail");
  const texto = input.value.trim();
  const mensaje = document.getElementById("printmensaje");

  if (texto) {
    mensaje.textContent = `Hemos enviado el cupón al correo ${texto}`;
    input.value = '';
  }
});