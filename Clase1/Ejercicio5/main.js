window.onload = function() {
    alert('¡Bienvenido a Mi Mini Sitio Web!');
};

document.addEventListener('DOMContentLoaded', function() {
    const btn = document.getElementById('temaBtn');
    btn.addEventListener('click', function() {
        document.body.classList.toggle('oscuro');
    });
});