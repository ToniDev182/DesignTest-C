const canvas = document.getElementById('miCanvas');
const ctx = canvas.getContext('2d');

// Propiedades de la Tierra
let tierra = {
    x: 50, // Posición x inicial de la Tierra
    y: 50, // Posición y inicial de la Tierra
    radio: 50, // Radio de la Tierra
    dx: 3, // Velocidad en x
    dy: 2 // Velocidad en y
};

// Cargar imagen de la textura de la Tierra (sin fondo)
const imagenTierra = new Image();
imagenTierra.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Earth_Eastern_Hemisphere.jpg/600px-Earth_Eastern_Hemisphere.jpg'; // Imagen de la Tierra sin fondo

// Función para dibujar la Tierra
function drawTierra() {
    ctx.save();
    ctx.beginPath();
    ctx.arc(tierra.x, tierra.y, tierra.radio, 0, Math.PI * 2); // Dibuja el contorno de la Tierra
    ctx.clip(); // Recorta la imagen dentro del círculo
    ctx.drawImage(imagenTierra, tierra.x - tierra.radio, tierra.y - tierra.radio, tierra.radio * 2, tierra.radio * 2); // Dibujar la imagen
    ctx.restore(); // Restablece el contexto
}

// Función para dibujar los bordes del canvas
function drawBorders() {
    ctx.strokeStyle = 'black'; // Color del borde
    ctx.lineWidth = 4; // Ancho del borde
    ctx.strokeRect(0, 0, canvas.width, canvas.height); // Dibuja el borde del canvas
}

// Función para actualizar la posición de la Tierra
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpia el canvas
    drawBorders(); // Dibuja los bordes
    drawTierra(); // Dibuja la Tierra

    // Actualiza la posición de la Tierra
    tierra.x += tierra.dx;
    tierra.y += tierra.dy;

    // Rebotar en las paredes
    if (tierra.x + tierra.radio > canvas.width || tierra.x - tierra.radio < 0) {
        tierra.dx = -tierra.dx; // Invierte la dirección en x
    }
    if (tierra.y + tierra.radio > canvas.height || tierra.y - tierra.radio < 0) {
        tierra.dy = -tierra.dy; // Invierte la dirección en y
    }
}

// Animación
function animate() {
    update(); // Actualiza la posición
    requestAnimationFrame(animate); // Llama a la función de animación
}

// Inicia la animación una vez que la imagen esté cargada
imagenTierra.onload = function () {
    animate();
};

document.addEventListener("DOMContentLoaded", function () {
    // Inicializa el mapa
    var map1 = L.map('map1').setView([40.7128, -74.0060], 13);

    // Capa de mapas
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(map1);

    // Marcadores para el primer mapa (Nueva York)
    var marker1 = L.marker([40.7128, -74.0060]).addTo(map1)
        .bindPopup('<b>DronShop</b><br>Tu tienda de drones en el corazón de Nueva York.<br>Ofrecemos una amplia gama de drones y accesorios.<br><img src="assets/image/dron3.jpg" alt="DronShop" width="150"><br><a href="#">Más información</a>')
        .openPopup();
});