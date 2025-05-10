// Genera las tallas dinámicamente
window.addEventListener('DOMContentLoaded', () => {
  const tallaSelect = document.getElementById('talla');
  for (let i = 37; i <= 44; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = i;
    tallaSelect.appendChild(option);
  }
});

function mostrarOpciones() {
  document.querySelector('.tarjeta-principal').style.display = 'none';
  document.getElementById('opciones').style.display = 'flex';
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
