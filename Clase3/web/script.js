// Cambia el color de fondo de la página aleatoriamente
function cambiarColorFondo() {
    const colores = ["#f4f4f4", "#807e7eff", "#26c2d6ff", "#d0e12eff", "#c722e0ff", "#1cc93bff"];
    const colorActual = document.body.style.backgroundColor;
    let nuevoColor;
    do {
        nuevoColor = colores[Math.floor(Math.random() * colores.length)];
    } while (nuevoColor === colorActual);
    document.body.style.backgroundColor = nuevoColor;
}

// Muestra una alerta con tu nombre y carrera
function mostrarAlerta() {
    alert("Nombre: \nCarrera: German De Leon / Perito contador en Computacion");
}

// Validación opcional del formulario
document.getElementById('contacto').addEventListener('submit', function(e) {
    const nombre = document.getElementById('nombre').value.trim();
    const correo = document.getElementById('correo').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();

    if (!nombre || !correo || !mensaje) {
        alert("Por favor, completa todos los campos del formulario.");
        e.preventDefault();
    }
});