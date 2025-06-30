import { SimuladorRutas } from './simulador.js';

// 3 variables para nuestros 3 componentes en html
const boton = document.getElementById("boton-principal");
const contenedor = document.getElementById("tablero");
const cuerpo = document.getElementById("cuerpo")

// instancia global para el simulador de tablero
let simulador = null;

// una variable para la accion del boton principal
let estado = 0;
let filas = 0;
let columnas = 0;

// click en boton principal
boton.addEventListener("click", function() {

    // damos click a iniciar
    if (estado === 0) {

        // Crear inputs para filas y columnas
        const inputFilas = document.createElement("input");
        inputFilas.type = "number";
        inputFilas.id = "input-filas";
        inputFilas.placeholder = "Filas";
        inputFilas.className = "flex border border-blue-300 bg-blue-100 text-blue-900 rounded-xl p-2 m-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400";

        const inputColumnas = document.createElement("input");
        inputColumnas.type = "number";
        inputColumnas.id = "input-columnas";
        inputColumnas.placeholder = "Columnas";
        inputColumnas.className = "flex border border-blue-300 bg-blue-100 text-blue-900 rounded-xl p-2 m-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400";

        // las agregamos al div cuerpo
        cuerpo.appendChild(inputFilas);
        cuerpo.appendChild(inputColumnas);

        // cambiamos texto del boton y asignamos el siguiente paso
        boton.textContent = "Generar tablero";
        estado = 1;
    }

    // damos click a generar tablero
    else if (estado === 1) { 

        // guardamos en una variable los inputs
        filas = parseInt(document.getElementById("input-filas").value);
        columnas = parseInt(document.getElementById("input-columnas").value);

        // validacion de datos ingresados por usuario
        if (isNaN(filas) || isNaN(columnas) || filas <= 0 || columnas <= 0) {
            alert("Introduce números válidos.");
            return;
        }

        // iniciamos la clase simulador y llamamos al metodo generarTablero
        simulador = new SimuladorRutas(filas, columnas, contenedor);
        simulador.generarTablero(() => estado);

        // removemos los inputs del cuerpo
        document.getElementById("input-filas").remove();
        document.getElementById("input-columnas").remove();

        // cambiamos texto y asignamos el siguiente paso
        boton.textContent = "Generar calles";
        estado = 2;
    }
    
    // damos click en generar calles
    else if (estado === 2) {

        // llamamos a la funcion generar cuadras
        simulador.generarCuadras();

        // cambiamos texto y vamos al ultimo paso
        boton.textContent = "Resolver tablero"; 
        estado = 3;
    }

    // damos click a resolver tablero
     else if (estado === 3) {

        // Validamos que haya una entrada y una salida antes de continuar
        const entrada = document.querySelector('[data-entrada="true"]');
        const salida = document.querySelector('[data-salida="true"]');

        if (!entrada || !salida) {
            alert("Debes seleccionar una entrada (verde) y una salida (roja) antes de resolver el tablero.");
            return; 
        }

        simulador.moverPasoAPaso();

        boton.textContent = "Reiniciar tablero"; 
        estado = 4;
     }

     // damos click a resetear tablero
     else if (estado === 4) {
        simulador.resetearTablero();
     }
});

