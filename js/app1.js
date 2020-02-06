const tareas = JSON.parse(localStorage.getItem("tareas")) || [];
let ulInicio = document.getElementById('ulInicio');
let ulProgreso = document.getElementById('ulProgreso');
let ulTerminado = document.getElementById('ulTerminado');
listar();
class Tarea {
    constructor(titulo, comentario, estado) {
        this.titulo = titulo;
        this.comentario = comentario;
        this.estado = estado;
    }
    guardar() {
        tareas.push(this);
        localStorage.setItem('tareas', JSON.stringify(tareas));
        console.log(tareas);
        // console.log(estado);
        listar();
    }
    //  
}

function muestra(idx) {
    document.getElementById("tituloModal").innerHTML = JSON.stringify(tareas[idx].titulo);
    document.getElementById("comentarioModal").innerHTML = JSON.stringify(tareas[idx].comentario);
}

// const progreso = [];
// const terminado = [];
// const aTareas = [inicio, progreso, terminado];
function elimina(idx) {
    tareas.splice(idx, 1);
    localStorage.setItem('tareas', JSON.stringify(tareas));
    listar();
}

function nuevaTarea() {
    let titulo = document.getElementById("titulo").value;
    let comentario = document.getElementById("comentario").value;
    let tarea = new Tarea(titulo, comentario, "inicio");
    // document.getElementById('guardar').focus();
    if (titulo) {
        // if (tareas.indexOf(titulo) > -1){
        //     alert("Ya existe la tarea!");
        // }
        // else{
            tarea.guardar();
    //     }
    }
    else {
        alert('Debe ingresar un nombre de tarea');
    }
    document.getElementById("formulario").reset();
    // listar();
}

function listar() {
    // console.log(tareas)

    // let ulInicio = document.getElementById("ulInicio");
    // let ulProgreso = document.getElementById("ulProgreso");
    // let ulTerminado = document.getElementById("ulTerminado");
    ulInicio.innerHTML = "";
    ulProgreso.innerHTML = "";
    ulTerminado.innerHTML = "";
    let ulLista = "";
    tareas.forEach(function (tarea, idx) {
        // let lista;
        switch (tareas[idx].estado) {
            case "inicio":
                ulLista = ulInicio;
                break;
            case "progreso":
                ulLista = ulProgreso;

                break;
            case "terminado":
                ulLista = ulTerminado;
                break;
            default:
                break;
        }
        if (tareas[idx].comentario != "") {
            // ulLista.innerHTML += `<li id="lista"  style="margin-top:15px; color:orange" class="d-flex justify-content-between">${tarea.titulo} <button onclick='cambiar(${idx})' style="background-color: blue;color: seashell">Adelante</button></li>`;
            ulLista.innerHTML += `<li id="lista_completa" onclick='muestra(${idx})' class="d-flex justify-content-between p-1 ">${tarea.titulo} <a href="#openModal"> <i class="far fa-comment-alt"></i></a> <i class="fas fa-trash-alt" onclick='elimina(${idx})' </i> </li>`;
        } else {
            // ulLista.innerHTML += `<li id="lista"  style="margin-top:15px" class="d-flex justify-content-between">${tarea.titulo} <button onclick='cambiar(${idx})' style="background-color: blue;color: seashell">Adelante</button></li>`;
            ulLista.innerHTML += `<li id="lista" class="d-flex justify-content-between p-1">${tarea.titulo} <i class="fas fa-trash-alt" onclick='elimina(${idx})'</i></li>`;
        }
    });
}
var element_origen;
var element_destino;
var codigo;
function comenzar() {
    element_origen = document.getElementById("lista");
    console.log(element_origen);
    //  debugger

    element_origen.addEventListener("dragend", comenzamos_arrastrar, false);

    element_destino = document.getElementById("ulTerminado");
    console.log(element_destino);

    element_destino.addEventListener("dragenter", function (e) {
        e.preventDefault();
    }, false);

    element_destino.addEventListener("dragover", function (e) {
        e.preventDefault();
    }, false);

    element_destino.addEventListener("drop", soltado, false);

}

function comenzamos_arrastrar(e) {

    codigo = `<li id="lista"  style="margin-top:15px; color:orange" class="d-flex justify-content-between>${tareas.titulo}</li>`;
    // console.log(codigo);

    // console.log(codigo);
    // debugger
    e.dataTransfer.setData("Text", codigo);


}

function soltado(e) {

    e.preventDefault();

    element_destino.innerHTML = e.dataTransfer.getData("Text");
    // console.log(element_destino.innerHTML);
    console.log(codigo);

    // localStorage.setItem('tareas', JSON.stringify(tareas));
    // listar();
}

// function myFunction(event) { 
//     // alert(event.target.innerHTML);
//     alert(tareas.titulo);

//     // alert(LI.value);
//   }
window.addEventListener("load", comenzar, false);

// ulInicio.addEventListener('click',(e)=>{
//     e.preventDefault();
//     // console.log(e);
//     console.log(e.path[0].childNodes[0].innerHTML);

// })
