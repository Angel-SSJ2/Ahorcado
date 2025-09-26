// Array de palabras para el juego
const palabras = [
    "computadora", "programacion", "desarrollo", "javascript", "tecnologia",
    "algoritmo", "hardware", "software", "internet", "servidor",
    "base", "datos", "aplicacion", "seguridad", "inteligencia",
    "artificial", "redes", "protocolo", "criptografia", "codigo"
];

// Array que contiene el "dibujo" del ahorcado en cada etapa
const partesAhorcado = [
            `
  +---+
  |   |
      |
      |
      |
      |
=========`,
            `
  +---+
  |   |
  O   |
      |
      |
      |
=========`,
            `
  +---+
  |   |
  O   |
  |   |
      |
      |
=========`,
            `
  +---+
  |   |
  O   |
 /|   |
      |
      |
=========`,
            `
  +---+
  |   |
  O   |
 /|\\  |
      |
      |
=========`,
            `
  +---+
  |   |
  O   |
 /|\\  |
 /    |
      |
=========`,
            `
  +---+
  |   |
  O   |
 /|\\  |
 / \\  |
      |
=========`,
            `
  +---+
  |   |
  O   |
 /|\\  |
 / \\  |
Ahorcado
=========`,
        ];

let palabraSeleccionada = "";
let palabraAdivinada = [];
let intentosFallidos = 0;
const maximosIntentos = 7;
let letrasUsadas = [];

// Función para iniciar un nuevo juego
function nuevoJuego() {
    // Selecciona una palabra al azar del array
    palabraSeleccionada = palabras[Math.floor(Math.random() * palabras.length)];
    // Crea un array de guiones para la palabra
    palabraAdivinada = Array(palabraSeleccionada.length).fill("_");
    intentosFallidos = 0;
    letrasUsadas = [];

    // Actualiza el texto de la palabra
    document.getElementById("contenedor-palabra").textContent = palabraAdivinada.join(" ");
    // Limpia los mensajes
    document.getElementById("mensaje").textContent = "";
    // Actualiza el contador de intentos
    document.getElementById("intentos").textContent = `Intentos fallidos: ${intentosFallidos} de ${maximosIntentos}`;
    
    // Muestra la horca vacía
    document.getElementById("dibujo-ahorcado").textContent = partesAhorcado[0];
    // Crea los botones de las letras
    crearBotonesLetras();
}

// Crea los botones del abecedario dinámicamente
function crearBotonesLetras() {
    const container = document.getElementById("contenedor-letras");
    container.innerHTML = "";
    for (let i = 65; i <= 90; i++) {
        const letter = String.fromCharCode(i);
        const button = document.createElement("button");
        button.textContent = letter;
        button.classList.add("letter-button");
        // Asigna la función manejarIntento al hacer clic
        button.addEventListener("click", () => manejarIntento(letter.toLowerCase()));
        container.appendChild(button);
    }
}

// Maneja la suposición de una letra
function manejarIntento(letra) {
    // No hace nada si la letra ya fue usada
    if (letrasUsadas.includes(letra)) {
        return;
    }

    // Deshabilita el botón de la letra para que no se pueda usar de nuevo
    const botones = document.getElementsByClassName("letter-button");
    for (const boton of botones) {
        if (boton.textContent.toLowerCase() === letra) {
            boton.disabled = true;
            break;
        }
    }

    letrasUsadas.push(letra);
    let encontrada = false;
    
    // Revisa si la letra está en la palabra
    for (let i = 0; i < palabraSeleccionada.length; i++) {
        if (palabraSeleccionada[i] === letra) {
            palabraAdivinada[i] = letra;
            encontrada = true;
        }
    }

    // Si la letra no fue encontrada, se agrega un intento fallido
    if (!encontrada) {
        intentosFallidos++;
        document.getElementById("intentos").textContent = `Intentos fallidos: ${intentosFallidos} de ${maximosIntentos}`;
        // Actualiza el dibujo del ahorcado
        document.getElementById("dibujo-ahorcado").textContent = partesAhorcado[intentosFallidos];
    }

    // Actualiza la palabra mostrada en pantalla
    document.getElementById("contenedor-palabra").textContent = palabraAdivinada.join(" ");

    // Revisa si el jugador ha ganado o perdido
    if (palabraAdivinada.join("") === palabraSeleccionada) {
        document.getElementById("mensaje").textContent = "¡Felicitaciones, adivinaste la palabra!";
        document.getElementById("intentos").textContent = `Intentos fallidos: ${intentosFallidos}`;
        deshabilitarTodosLosBotones();
    } else if (intentosFallidos >= maximosIntentos) {
        document.getElementById("mensaje").textContent = `¡Perdiste! La palabra era: ${palabraSeleccionada}`;
        deshabilitarTodosLosBotones();
    }
}

// Deshabilita todos los botones para terminar el juego
function deshabilitarTodosLosBotones() {
    const botones = document.getElementsByClassName("letter-button");
    for (const boton of botones) {
        boton.disabled = true;
    }
}

// Inicia el juego cuando la página se carga
window.onload = nuevoJuego;
