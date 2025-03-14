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

// Crear el elemento para la carita triste
const sadFace = document.createElement('span');
sadFace.textContent = '😔';
sadFace.style.fontSize = '3em';
sadFace.style.display = 'none'; // Inicialmente oculto
document.getElementById('numero-container').appendChild(sadFace);

// Crear el elemento para la carita feliz
const happyFace = document.createElement('span');
happyFace.textContent = '😊';
happyFace.style.fontSize = '3em';
happyFace.style.display = 'none'; // Inicialmente oculto
document.getElementById('numero-container').appendChild(happyFace);

// Crear el elemento para el sonido de aplausos
const applauseSound = new Audio('sound/palmas.mp3');
applauseSound.volume = 0.3; // Establecer el volumen bajo

let numeroCorrecto;
let opciones = [];
let isMuted = false;
let gameStarted = false; // Variable para controlar si el juego ha comenzado
const efectosVolumen = 0.5; // Volumen por defecto para los efectos de sonido
const volumenInicialMusica = 0.1;

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
  sound.currentTime = 0; // Reinicia el sonido al principio
  sound.play();
}

function playNumeroAudio(numero) {
    let audio;
    switch (numero) {
        case 0: audio = ceroAudio; break;
        case 1: audio = unoAudio; break;
        case 2: audio = dosAudio; break;
        case 3: audio = tresAudio; break;
        case 4: audio = cuatroAudio; break;
        case 5: audio = cincoAudio; break;
        case 6: audio = seisAudio; break;
        case 7: audio = sieteAudio; break;
        case 8: audio = ochoAudio; break;
        case 9: audio = nueveAudio; break;
        case 10: audio = diezAudio; break;
        default: return; // No hacer nada si el número no es válido
    }
    
    audio.currentTime = 0;
    audio.play();
}

function mostrarPregunta() {
  numeroCorrecto = generarNumeroAleatorio();
  numeroMostrado.textContent = numeroCorrecto;
  nombreNumero.textContent = '';
  sadFace.style.display = 'none'; // Ocultar la carita triste
  happyFace.style.display = 'none'; // Ocultar la carita feliz

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

   // Aplicar la misma fuente, tamaño y sombra de texto a las opciones
   opcion1.style.fontFamily = "'Patrick Hand', cursive";
   opcion1.style.fontSize = "3em";
   opcion1.style.textShadow = "2px 2px 4px rgba(0, 0, 0, 0.3)";
   opcion2.style.fontFamily = "'Patrick Hand', cursive";
   opcion2.style.fontSize = "3em";
   opcion2.style.textShadow = "2px 2px 4px rgba(0, 0, 0, 0.3)";
   opcion3.style.fontFamily = "'Patrick Hand', cursive";
   opcion3.style.fontSize = "3em";
   opcion3.style.textShadow = "2px 2px 4px rgba(0, 0, 0, 0.3)";

  mensaje.textContent = "";
}

function verificarRespuesta(opcionSeleccionada) {
  if (opcionSeleccionada === numeroCorrecto) {
    mensaje.textContent = "¡Correcto! ¡Bien hecho!";
    mensaje.style.color = "green";
    nombreNumero.textContent = nombresNumeros[numeroCorrecto];
    playNumeroAudio(numeroCorrecto);
    
    // Lanzar confeti
    const jsConfetti = new JSConfetti()
    jsConfetti.addConfetti()
    sadFace.style.display = 'none'; // Ocultar la carita triste si estaba visible
    happyFace.style.display = 'inline'; // Mostrar la carita feliz
    correctSound.volume = efectosVolumen; //Establecer volumen
    correctSound.src = 'sound/correct.mp3';
    playSound(correctSound);
    
    // Reproducir el sonido de aplausos con volumen bajo
    applauseSound.currentTime = 0;
    applauseSound.play();

  } else {
    mensaje.textContent = "¡Inténtalo de nuevo! Ese no es el número.";
    mensaje.style.color = "red";
    nombreNumero.textContent = '';
    incorrectSound.volume = efectosVolumen; //Establecer volumen
    incorrectSound.src = 'sound/incorrect.mp3';
    playSound(incorrectSound);
    sadFace.style.display = 'inline'; // Mostrar la carita triste
    happyFace.style.display = 'none'; // Ocultar la carita feliz
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
    backgroundMusic.volume = volumenInicialMusica;
    backgroundMusic.muted = isMuted; // Asegurarse de que el estado de silencio se aplique
    backgroundMusic.src = 'sound/background.mp3';
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

// Cargar los audios
correctSound.src = "sound/correct.mp3";
incorrectSound.src = "sound/incorrect.mp3";
backgroundMusic.src = "sound/background.mp3";
ceroAudio.src = "sound/cero.mp3";
unoAudio.src = "sound/uno.mp3";
dosAudio.src = "sound/dos.mp3";
tresAudio.src = "sound/tres.mp3";
cuatroAudio.src = "sound/cuatro.mp3";
cincoAudio.src = "sound/cinco.mp3";
seisAudio.src = "sound/seis.mp3";
sieteAudio.src = "sound/siete.mp3";
ochoAudio.src = "sound/ocho.mp3";
nueveAudio.src = "sound/nueve.mp3";
diezAudio.src = "sound/diez.mp3";

mostrarPregunta();