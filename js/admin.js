let botonRegresar = document.getElementById("btnRegresar");
botonRegresar.addEventListener("click", fn_regresar);

const URL_API_SERVER="http://localhost:3000/user";
let opcionEditar = false;
let id = document.getElementById("txtId");
let nombre = document.getElementById("txtNombre");
let appaterno = document.getElementById("txtApPaterno");
let apmaterno = document.getElementById("txtApMaterno");
let email = document.getElementById("txtEmail");
let pass = document.getElementById("txtPassword");

let botonGuardar = document.getElementById("btnGuardar");
let botonLimpiar = document.getElementById("btnLimpiar");
let botonEliminar = document.getElementById("btnEliminarTodo");

let tabla_datos = document.getElementById("tbody_datos");


document.addEventListener("DOMContentLoaded", fn_cargar);
botonGuardar.addEventListener("click", fn_guardar);
botonLimpiar.addEventListener("click", fn_limpiar);
botonEliminar.addEventListener("click", fn_eliminar_todo);

function fn_eliminar_todo() {

    let filas = tabla_datos.rows;


    for (let i = filas.length - 1; i >= 0; i--) {
        let id = filas[i].cells[0].innerHTML;
        let opciones = {
            method: "DELETE"
        };
        fetch(URL_API_SERVER + "/" + id, opciones)
        .then(res => res.json())
        .then(() => {
            tabla_datos.deleteRow(i);
        });
    }

    localStorage.clear();

    alertify.success('Se eliminó todo el registro de la base de datos');
}

function fn_guardar(){
    let metodo;
    let url;

    if(opcionEditar){
        metodo="PUT";
        url=URL_API_SERVER + "/" + id.value;
    }else{
        metodo="POST";
        url=URL_API_SERVER;
    }

    let opciones = {
        method: metodo,
        body: JSON.stringify({
            "id": id.value,
            "Nombres": nombre.value,
            "Apellido_Paterno": appaterno.value,
            "Apellido_Materno": apmaterno.value,
            "Correo_electronico": email.value,
            "Password": pass.value
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    };

   fetch(url, opciones)
   .then(res=> res.json())
   .then(res=>{
    alertify.success('Se registró correctamente');
    fn_cargar();
    fn_limpiar(); 


    localStorage.setItem(email.value, JSON.stringify({
        Password: pass.value,
    }));
   });
}




function fn_regresar(){
    location.href="login.html";
}



function fn_cargar(){
    
    fetch(URL_API_SERVER)
    .then(res=> res.json())
    .then( res =>{
        let fila = "";
        for(let i=0; i< res.length; i++){
       

            localStorage.setItem(res[i].Correo_electronico, JSON.stringify({
                Password: res[i].Password
            }));

            fila += `
                <tr>
                    <td>${res[i].id}</td>
                    <td>${res[i].Nombres}</td>
                    <td>${res[i].Apellido_Paterno}</td>
                    <td>${res[i].Apellido_Materno}</td>
                    <td>${res[i].Correo_electronico}</td>
                    <td>${res[i].Password}</td>
                    <td>
                        <button class = 'btn btn-primary'
                            onclick = 'fn_editar(${i})'> Editar </button>
                        <button class = 'btn btn-danger'
                            onclick = 'fn_eliminar(${i},${res[i].id})'> Eliminar </button>
                    </td>
                </tr>
            `;
        };
        document.getElementById("tbody_datos").innerHTML= fila;
    });


}

function fn_eliminar(i, codigo){
    alertify.confirm('Deseas eliminar el registro?',
        function(){
            let opciones = {
                method : "Delete"
            };
            fetch(URL_API_SERVER+"/"+codigo, opciones)
            .then(res=> res.json())
            .then(res=>{
                console.log(res);
                tabla_datos.deleteRow(i);

                localStorage.removeItem("_nombre");
                localStorage.removeItem("_appaterno");
                localStorage.removeItem("_apmaterno");
                localStorage.removeItem("_email");
                localStorage.removeItem("_pass");

                alertify.success('Se elimino el registro');

            });
            
        },
        function(){
        });
}

function fn_editar(i){
    let cod, nom, apepa, apema, em, pa;
    cod = tabla_datos.rows[i].cells[0].innerHTML;
    nom = tabla_datos.rows[i].cells[1].innerHTML;
    apepa = tabla_datos.rows[i].cells[2].innerHTML;
    apema = tabla_datos.rows[i].cells[3].innerHTML;
    em = tabla_datos.rows[i].cells[4].innerHTML;
    pa = tabla_datos.rows[i].cells[5].innerHTML;

    id.value = cod;
    nombre.value = nom;
    appaterno.value = apepa;
    apmaterno.value = apema;
    email.value = em;
    pass.value = pa;
    opcionEditar = true;

    nombre.disabled = false;
    appaterno.disabled = false;
    apmaterno.disabled = false;
    email.disabled = false;
    pass.disabled = false;
    botonGuardar.disabled = false;
    botonLimpiar.disabled = false;


}

function fn_limpiar() {
    id.value = "";
    nombre.value = "";
    appaterno.value = "";
    apmaterno.value = "";
    email.value = "";
    pass.value = "";
    nombre.disabled = true;
    appaterno.disabled = true;
    apmaterno.disabled = true;
    email.disabled = true;
    pass.disabled = true;
    opcionEditar = false;
}

