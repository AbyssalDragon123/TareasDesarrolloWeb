

// Función para mostrar la bienvenida
function mostrarBienvenida() {
    const saludo = "¡Bienvenidos a los increíbles lugares turísticos de Guatemala!";
    let listaLugares = "Aquí algunos de los destinos más populares:\n";
    


    // Mostrar el mensaje de bienvenida
    alert(`${saludo}\n\n${listaLugares}`);
}

// Llamar a la función al cargar la página
window.onload = mostrarBienvenida;
