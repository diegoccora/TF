document.getElementById('Unirme').addEventListener('click', function(e) {
    e.preventDefault();

    const nombre = document.getElementById('txtNombre').value;
    const appaterno = document.getElementById('txtApPaterno').value;
    const apmaterno = document.getElementById('txtApMaterno').value;
    const email = document.getElementById('txtEmail').value;
    const pass = document.getElementById('txtPassword').value;
    const existingUser = localStorage.getItem(email);

    if (!nombre || !appaterno || !apmaterno || !email || !pass) {
        alert('Por favor, completa todos los campos antes de registrar.');
        return;
    }

    if (existingUser) {
        alert('Este correo ya está registrado.');
        return;
    }

    const user = {
        Nombre: nombre,
        Apellido_Paterno: appaterno,
        Apellido_Materno: apmaterno,
        Email: email,
        Password: pass
    };

    localStorage.setItem(email, JSON.stringify(user));
    alert('Usuario registrado exitosamente');

    window.location.href = 'login.html'; 
});