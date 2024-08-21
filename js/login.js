document.getElementById('Ingresar_login').addEventListener('click', function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const pass = document.getElementById('password').value;

    if (!email || !pass) {
        alert('Por favor, ingresa tu correo electrónico y contraseña.');
        return;
    }

    const storedUser = localStorage.getItem(email);
    if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user.Password === pass) {
            alert('Inicio de sesión exitoso');
            window.location.href = 'inicio.html';
        } else {
            alert('Contraseña incorrecta');
        }
    } else {
        alert('No se encontró un usuario con ese correo');
    }

    if (!storedUser) {
        alert('No se encontró un usuario con ese correo');
        return;
    }
});