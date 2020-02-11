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
        listar();
    }
    //  
}

function muestra(idx) {
    document.getElementById("tituloModal").innerHTML = JSON.stringify(tareas[idx].titulo);
    document.getElementById("comentarioModal").innerHTML = JSON.stringify(tareas[idx].comentario);
}
function modifica(idx) {
    document.getElementById("tituloModal").innerHTML = JSON.stringify(tareas[idx].titulo);
    document.getElementById("comentarioModal").innerHTML = JSON.stringify(tareas[idx].comentario);

}
// function muestra1(titulo) {
//     console.log(titulo);
//     document.getElementById("tituloModal").innerHTML.value =titulo;
//     // document.getElementById("comentarioModal").innerHTML = JSON.stringify(tareas[idx].comentario);
// }

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

        if (tareas.find(tarea => tarea.titulo.toLowerCase() == titulo.toLowerCase())) {
            alert("Ya existe la tarea " + titulo + "!");
            // muestra1(titulo);
        }
        else {
            tarea.guardar();
        }
    }
    else {
        alert('Debe ingresar un nombre de tarea');
    }
    document.getElementById("formulario").reset();
    // listar();
}

function cambia(evt,idx) {
    
    if (parseInt(evt.button) == 2) {
        switch (tareas[idx].estado) {
            case "inicio":
                tareas[idx].estado = "progreso";
                break;
            case "progreso":
                tareas[idx].estado = "terminado";
                break;
        }
    }
    else {
        switch (tareas[idx].estado) {
            case "terminado":
                tareas[idx].estado = "progreso";
                break;
            case "progreso":
                tareas[idx].estado = "inicio";
                break;

        }
    }
    localStorage.setItem('tareas', JSON.stringify(tareas));

    listar();
}
// function retrocede(idx) {
//     switch (tareas[idx].estado) {
//         case "terminado":
//             tareas[idx].estado = "progreso";
//             break;
//         case "progreso":
//             tareas[idx].estado = "inicio";
//             break;

//     }
//     localStorage.setItem('tareas', JSON.stringify(tareas));

//     listar();
// // }

function listar() {

    ulInicio.innerHTML = "";
    ulProgreso.innerHTML = "";
    ulTerminado.innerHTML = "";
    let ulLista = "";
    tareas.forEach(function (tarea, idx) {
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
        if (tareas[idx].comentario) {
            ulLista.innerHTML += `<li id="lista_completa"   class="d-flex justify-content-between p-1 "><p onmousedown="cambia(event,${idx});">
            ${tarea.titulo}</p> <span><a href="#openModal" onclick='muestra(${idx})'><i class="far fa-comment-alt" ></i></a> <i class="far fa-edit"  data-toggle="modal" data-target="#modificar" data-whatever="@mdo" onclick="modifica('${tarea.titulo}','${tarea.comentario}','${idx}')"></i> <i class="fas fa-trash-alt" onclick='elimina(${idx})'</i> </span></li>`;

        } else {
            ulLista.innerHTML += `<li id="lista" class="d-flex justify-content-between p-1"><p onmousedown="cambia(event,${idx});">
            ${tarea.titulo}</p> <span><i class="fas fa-trash-alt" onclick='elimina(${idx})'</i></span></li>`;
        }
    });
}
function modifica(titulo, comentario, idx) {
    $('#titulo1').val(titulo);
    $('#comentario1').val(comentario);
    i = idx;
    return i;
}

function modificaTarea(i) {
    let titulo = document.getElementById("titulo1").value;
    let comentario = document.getElementById("comentario1").value;
    tareas[i].titulo = titulo;
    tareas[i].comentario = comentario;
    localStorage.setItem('tareas', JSON.stringify(tareas));
    listar();

}

// var element_origen;
// var element_destino;
// var codigo;
// function comenzar() {
//     element_origen = document.getElementById("lista");
//     console.log(element_origen);
//     //  debugger

//     element_origen.addEventListener("dragend", comenzamos_arrastrar, false);

//     element_destino = document.getElementById("ulTerminado");
//     console.log(element_destino);

//     element_destino.addEventListener("dragenter", function (e) {
//         e.preventDefault();
//     }, false);

//     element_destino.addEventListener("dragover", function (e) {
//         e.preventDefault();
//     }, false);

//     element_destino.addEventListener("drop", soltado, false);

// }

// function comenzamos_arrastrar(e) {

//     codigo = `<li id="lista"  style="margin-top:15px; color:orange" class="d-flex justify-content-between>${tareas.titulo}</li>`;
//     // console.log(codigo);

//     // console.log(codigo);
//     // debugger
//     e.dataTransfer.setData("Text", codigo);


// }

// function soltado(e) {

//     e.preventDefault();

//     element_destino.innerHTML = e.dataTransfer.getData("Text");
//     // console.log(element_destino.innerHTML);
//     console.log(codigo);
//     tareas[idx].estado="terminado";
//     localStorage.setItem('tareas', JSON.stringify(tareas));
//     tareas = JSON.parse(localStorage.getItem("tareas"));
//     listar();

//     // localStorage.setItem('tareas', JSON.stringify(tareas));
//     // listar();
// }

// // function myFunction(event) { 
// //     // alert(event.target.innerHTML);
// //     alert(tareas.titulo);

// //     // alert(LI.value);
// //   }
// window.addEventListener("load", comenzar, false);

// ulInicio.addEventListener('click',(e)=>{
//     e.preventDefault();
//     // console.log(e);
//     console.log(e.path[0].childNodes[0].innerHTML);

// })



// function sortable(rootEl, onUpdate) {
//     var dragEl;

//     // Делаем всех детей перетаскиваемыми
//     [].slice.call(rootEl.children).forEach(function (itemEl) {
//         itemEl.draggable = true;
//     });

//     // Фнукция отвечающая за сортировку
//     function _onDragOver(evt) {
//         evt.preventDefault();
//         evt.dataTransfer.dropEffect = 'move';

//         var target = evt.target;
//         if (target && target !== dragEl && target.nodeName == 'LI') {
//             // Сортируем
//             rootEl.insertBefore(dragEl, target.nextSibling || target);
//         }
//     }

//     // Окончание сортировки
//     function _onDragEnd(evt) {
//         evt.preventDefault();

//         dragEl.classList.remove('ghost');
//         rootEl.removeEventListener('dragover', _onDragOver, false);
//         rootEl.removeEventListener('dragend', _onDragEnd, false);

//         // Сообщаем об окончании сортировки
//         onUpdate(dragEl);
//     }

//     // Начало сортировки
//     rootEl.addEventListener('dragstart', function (evt) {
//         dragEl = evt.target; // Запоминаем элемент который будет перемещать

//         // Ограничиваем тип перетаскивания
//         evt.dataTransfer.effectAllowed = 'move';
//         evt.dataTransfer.setData('Text', dragEl.textContent);

//         // Пописываемся на события при dnd
//         rootEl.addEventListener('dragover', _onDragOver, false);
//         rootEl.addEventListener('dragend', _onDragEnd, false);

//         setTimeout(function () {
//             // Если выполнить данное действие без setTimeout, то
//             // перетаскиваемый объект, будет иметь этот класс.
//             dragEl.classList.add('ghost');
//         }, 0)
//     }, false);
// }

// // Используем                    
// sortable(document.getElementById('ulInicio'), function (item) {
//     //    let a=System.out.println(ulInicio.get(1));
//     // localStorage.setItem('ulInicio', JSON.stringify(ulInicio.li));
//     // a= document.getElementById.value
//     console.log(sessionStorage.key(i));
// });