let botonUnirme  = document.getElementById("Unirme");



let nombre = document.getElementById("txtNombre");
let appaterno = document.getElementById("txtApPaterno");
let apmaterno = document.getElementById("txtApMaterno");
let email = document.getElementById("txtEmail");
let pass = document.getElementById("txtPassword");



botonUnirme.disabled = true;

function verificarCampos() {
    if (nombre.value && appaterno.value && apmaterno.value && email.value && pass.value) {
        botonUnirme.disabled = false;
    } else {
        botonUnirme.disabled = true;
    }
}

nombre.addEventListener("input", verificarCampos);
appaterno.addEventListener("input", verificarCampos);
apmaterno.addEventListener("input", verificarCampos);
email.addEventListener("input", verificarCampos);
pass.addEventListener("input", verificarCampos);

botonUnirme.addEventListener("click", fn_registrar);
botonUnirme.addEventListener("click", fn_agregar);
botonUnirme.addEventListener("click", fn_cargarDatos);
botonUnirme.addEventListener("click", fn_limpiar);








document.addEventListener("DOMContentLoaded", function() {
    if (!localStorage.getItem("userIdCounter")) {
        localStorage.setItem("userIdCounter", "0");
    }
});


function fn_registrar(){
    console.log("fn_registrar");
    //location.href= "https://www.google.com/";


    console.log("Nombres : " + nombre.value );
    console.log("Apellido Paterno : " + appaterno.value );
    console.log("Apellido Materno : " + apmaterno.value );
    console.log("Correo electrónico : " + email.value );
    console.log("Password : " + pass.value );


    localStorage.setItem("_nombre", nombre.value);
    localStorage.setItem("_appaterno", appaterno.value);
    localStorage.setItem("_apmaterno", apmaterno.value);
    localStorage.setItem("_email", email.value);
    localStorage.setItem("_pass", pass.value);


 
}

function fn_agregar(){

       // Obtener el contador de ids desde el localStorage y convertirlo a un número
       let idCounter = parseInt(localStorage.getItem("userIdCounter"), 10);

       // Incrementar el contador y guardarlo de nuevo en el localStorage
       idCounter += 1;
       localStorage.setItem("userIdCounter", idCounter.toString());


    let obj_usuarios = {
        
        "id": idCounter.toString(),
        "Nombres": nombre.value,
        "Apellido_Paterno": appaterno.value,
        "Apellido_Materno": apmaterno.value,
        "Correo_electronico": email.value,
        "Password": pass.value
    };
    let opciones = {
        method : "POST",
        body: JSON.stringify(obj_usuarios)
    }
    fetch("http://localhost:3000/user", opciones)
    .then( res=> res.json())
    .then( res =>{
        console.log(res);
    });



}


function fn_limpiar(){
    console.log("fn_limpiar");

    nombre.value = "";
    appaterno.value = "";
    apmaterno.value = "";
    email.value = "";
    pass.value = "";
    nombre.focus();

    verificarCampos();

}

function fn_listar(){
    location.href="listado.html";
}


function fn_cargarDatos(){
  let nombre = localStorage.getItem("_nombre");
  let appaterno = localStorage.getItem("_appaterno");
  let apmaterno = localStorage.getItem("_apmaterno");
  let email = localStorage.getItem("_email");
  let pass = localStorage.getItem("_pass");

  console.log("Nombres: " + nombre);
  console.log("Apellido Paterno: " + appaterno);
  console.log("Apellido Materno: " + apmaterno);
  console.log("Correo electrónico: " + email);
  console.log("Contraseña: " + pass);

}


