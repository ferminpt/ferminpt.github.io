// Genera las tallas dinámicamente al cargar la página
function generarTallas() {
  const selectTallas = document.getElementById("talla");

  if (selectTallas) {
    for (let i = 37; i <= 44; i++) {
      const opcion = document.createElement("option");
      opcion.value = i;
      opcion.textContent = i;
      selectTallas.appendChild(opcion);
    }
  }
}

window.addEventListener('DOMContentLoaded', generarTallas);

function mostrarOpciones() {
  const talla = document.getElementById("talla").value;
  const color = document.getElementById("color").value;

  // Ocultar formulario y mostrar opciones
  document.getElementById("formulario-inicial").style.display = "none";
  document.getElementById("opciones").style.display = "block";

  // Enviar datos al backend
  fetch('/enviar', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ talla, color })
  })
  .then(response => {
    if (!response.ok) throw new Error("Error en el envío MQTT");
    return response.text();
  })
  .then(data => {
    console.log("Respuesta del servidor:", data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
}


function mostrarProcesando() {
  document.getElementById('opciones').style.display = 'none';
  document.getElementById('procesando').style.display = 'block';

  setTimeout(() => {
    document.getElementById('procesando').style.display = 'none';
    document.getElementById('acciones').style.display = 'block';
  }, 2000);
}

function mostrarMensaje(texto) {
  document.getElementById("acciones").style.display = 'none';
  document.getElementById("mensaje-final").style.display = 'block';
  document.getElementById("mensaje-texto").textContent = texto;
}

function volverAlInicio() {
  document.getElementById("mensaje-final").style.display = "none";
  document.querySelector(".tarjeta-principal").style.display = "flex";
}
