const numeroMostrado = document.getElementById('numero-mostrado');
const nombreNumero = document.getElementById('nombre-numero');
const opcion1 = document.getElementById('opcion1');
const opcion2 = document.getElementById('opcion2');
const opcion3 = document.getElementById('opcion3');
const mensaje = document.getElementById('mensaje');
const siguienteBtn = document.getElementById('siguiente');

// Elementos de sonido
const correctSound = document.getElementById('correctSound');
const incorrectSound = document.getElementById('incorrectSound');
const backgroundMusic = document.getElementById('backgroundMusic');
const muteButton = document.getElementById('muteButton');
const volumeSlider = document.getElementById('volumeSlider');

let numeroCorrecto;
let opciones = [];
let isMuted = false;
let gameStarted = false; // Variable para controlar si el juego ha comenzado
const efectosVolumen = 0.5; // Volumen por defecto para los efectos de sonido

const nombresNumeros = {
  0: "cero",
  1: "uno",
  2: "dos",
  3: "tres",
  4: "cuatro",
  5: "cinco",
  6: "seis",
  7: "siete",
  8: "ocho",
  9: "nueve",
  10: "diez"
};

const coloresOpciones = [
  "#e91e63", // Rosa
  "#9c27b0", // Morado
  "#3f51b5", // Azul
  "#2196f3", // Azul más claro
  "#00bcd4", // Cian
  "#009688", // Verde azulado
  "#4caf50", // Verde
  "#8bc34a", // Verde claro
  "#ffeb3b", // Amarillo
  "#ffc107", // Ámbar
  "#ff9800", // Naranja
  "#ff5722"  // Naranja rojizo
];

function generarNumeroAleatorio() {
  return Math.floor(Math.random() * 11);
}

function generarOpciones(correcto) {
  opciones = [correcto];
  while (opciones.length < 3) {
    let opcion = generarNumeroAleatorio();
    if (!opciones.includes(opcion)) {
      opciones.push(opcion);
    }
  }
  opciones.sort(() => Math.random() - 0.5);
}

function asignarColorAleatorio(elemento) {
  const color = coloresOpciones[Math.floor(Math.random() * coloresOpciones.length)];
  elemento.style.color = color;
}

function playSound(sound) {
    if (sound === backgroundMusic && isMuted) {
        return; // No reproducir la música de fondo si está silenciada
    }
    sound.currentTime = 0; // Reinicia el sonido al principio
    sound.play();
}

function mostrarPregunta() {
  numeroCorrecto = generarNumeroAleatorio();
  numeroMostrado.textContent = numeroCorrecto;
  nombreNumero.textContent = '';

  // Aplicar el mismo estilo y color al número mostrado
  numeroMostrado.style.fontFamily = "'Patrick Hand', cursive";
  numeroMostrado.style.textShadow = "2px 2px 4px rgba(0, 0, 0, 0.3)";
  numeroMostrado.style.fontSize = "6em";
  numeroMostrado.style.color = "#e67e22"; // Naranja brillante

  generarOpciones(numeroCorrecto);

  opcion1.textContent = opciones[0];
  opcion2.textContent = opciones[1];
  opcion3.textContent = opciones[2];

  // Asignar estilos y colores aleatorios a las opciones
  asignarColorAleatorio(opcion1);
  asignarColorAleatorio(opcion2);
  asignarColorAleatorio(opcion3);

  opcion1.style.fontFamily = "'Patrick Hand', cursive";
  opcion1.style.fontSize = "3em";
  opcion1.style.textShadow = "1px 1px 2px rgba(0, 0, 0, 0.5)";
  opcion2.style.fontFamily = "'Patrick Hand', cursive";
  opcion2.style.fontSize = "3em";
  opcion2.style.textShadow = "1px 1px 2px rgba(0, 0, 0, 0.5)";
  opcion3.style.fontFamily = "'Patrick Hand', cursive";
  opcion3.style.fontSize = "3em";
  opcion3.style.textShadow = "1px 1px 2px rgba(0, 0, 0, 0.5)";

  mensaje.textContent = "";
}

function verificarRespuesta(opcionSeleccionada) {
  if (opcionSeleccionada === numeroCorrecto) {
    mensaje.textContent = "¡Correcto! ¡Bien hecho!";
    mensaje.style.color = "green";
    nombreNumero.textContent = nombresNumeros[numeroCorrecto];
    correctSound.volume = efectosVolumen; //Establecer volumen
    playSound(correctSound);
  } else {
    mensaje.textContent = "¡Inténtalo de nuevo! Ese no es el número.";
    mensaje.style.color = "red";
    nombreNumero.textContent = '';
    incorrectSound.volume = efectosVolumen; //Establecer volumen
    playSound(incorrectSound);
  }
}

opcion1.addEventListener('click', () => verificarRespuesta(opciones[0]));
opcion2.addEventListener('click', () => verificarRespuesta(opciones[1]));
opcion3.addEventListener('click', () => verificarRespuesta(opciones[2]));

siguienteBtn.addEventListener('click', mostrarPregunta);

// Funcionalidad de silencio (solo para la música de fondo)
muteButton.addEventListener('click', () => {
  isMuted = !isMuted;
  backgroundMusic.muted = isMuted; // Solo silenciar la música de fondo
  muteButton.textContent = isMuted ? "🔇" : "🔊";
});

// Funcionalidad del control de volumen (solo para la música de fondo)
volumeSlider.addEventListener('input', () => {
  backgroundMusic.volume = volumeSlider.value;
});

// Función para iniciar el juego y la música
function startGame() {
  if (!gameStarted) {
    backgroundMusic.volume = volumeSlider.value;
    backgroundMusic.muted = isMuted; // Asegurarse de que el estado de silencio se aplique

    // Intenta reproducir la música y captura cualquier error
    backgroundMusic.play().catch(error => {
      console.error("Error al reproducir la música de fondo:", error);
      mensaje.textContent = "El sonido de fondo está bloqueado. Interactúa con el juego para habilitarlo.";
      // Si la reproducción automática falla, adjunta el evento de clic al botón "Siguiente"
      siguienteBtn.addEventListener('click', startMusicOnNext, { once: true });
    });

    gameStarted = true;
  }
}

function startMusicOnNext() {
    backgroundMusic.play().catch(error => {
        console.error("Error al reproducir la música de fondo (botón Siguiente):", error);
        mensaje.textContent = "El sonido de fondo sigue bloqueado. Asegúrate de que el navegador no esté silenciado.";
    });
}

// Iniciar el juego al primer toque o clic
document.addEventListener('mousedown', startGame);
document.addEventListener('touchstart', startGame);

mostrarPregunta();