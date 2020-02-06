let ulTareas = document.getElementById('ulTareas');
let ulProgresos = document.getElementById('ulProgresos');
let ulTerminados = document.getElementById('ulTerminados');
const tareas = ["uno", "dos", "tres"];
const progresos = [];
const terminados = [];
const todas = ["tareas", "progresos", "terminados"];
localStorage.setItem('toda', JSON.stringify(todas));
// Lista los tres procesos de las tareas
listar();
var mostrar;
function listar() {
    // ulLista.innerHTML="";
    todas.forEach(function (toda, idx) {
        let lista;
        let ulLista;
        switch (toda) {
            case "tareas":
                lista = tareas;
                ulLista = ulTareas;
                // document.getElementById("muestra").style.display = "none";
                // document.getElementById("muestra").style.display = "inline";
                mostrar = 0;
                break;
            case "progresos":
                lista = progresos;
                ulLista = ulProgresos;
                mostrar = 1;
                // muestra=inline;
                break
            case "terminados":
                lista = terminados;
                ulLista = ulTerminados;
                mostrar = 2;
                // document.getElementById("muestra").style.display="none";
                break
            default:
                break;
        }
            ulLista.innerHTML = "";
        lista.forEach(function (tarea, i) {
            if (mostrar == 0) {
                ulLista.innerHTML += `<li id="lista"  style="margin-top:15px" class="d-flex justify-content-between">${tarea} <button onclick="pasa(${i},${idx})" style="background-color: blue;color: seashell">Adelante</button></li>`;
            }
            if (mostrar == 1) {

                ulLista.innerHTML += `<li id="lista"  style="margin-top:15px" class="d-flex justify-content-between"><button id="muestra" onclick="pasa1(${i},${idx})" style="background-color: blue;color: seashell;">Atras</button>${tarea} <button onclick="pasa(${i},${idx})" style="background-color: blue;color: seashell">Adelante</button></li>`;
            }
            if (mostrar == 2) {

                ulLista.innerHTML += `<li id="lista"  style="margin-top:15px" class="d-flex justify-content-between"><button id="muestra" onclick="pasa(${i},${idx})" style="background-color: blue;color: seashell;">Atras</button>${tarea}</li>`;
            }
        });
    });
}

function pasa(i, idx) {

    // let librosAlquilados = JSON.parse(localStorage.getItem("alquilados"));
    // if (librosAlquilados === null) {
    //     librosAlquilados = [];
    // }
    // let librosDisponibles = JSON.parse(localStorage.getItem("libros"));
    switch (idx) {
        case 0:
            progresos.push(tareas[i]);
            tareas.splice(tareas, 1);
            // listar();
            break;
        case 1:
            terminados.push(progresos[i]);
            progresos.splice(progresos, 1);
            // document.getElementById("muestra").style.display = "inline";
            // listar();
            break;
        case 2:
            progresos.push(terminados[i]);
            terminados.splice(terminados[i], 1);
            console.log(i);
            console.log(idx);
            // listar();
            break;
        default:
            break;
    }
    // localStorage.setItem('alquilados', JSON.stringify(librosAlquilados));
    // localStorage.setItem('libros', JSON.stringify(librosDisponibles));

        listar();
}

function pasa1(i, idx) {
    tareas.push(progresos[i]);
    progresos.splice(progresos, 1);
    listar();
}