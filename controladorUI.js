import { SimuladorRutas } from "../simulador.js";

export class ControladorUI {
    constructor() {
        // 3 atributos para nuestros 3 componentes en html
        this.boton = document.getElementById("boton-principal");
        this.contenedor = document.getElementById("tablero");
        this.cuerpo = document.getElementById("cuerpo");

        // atributos para instanciar
        this.simulador = null;
        this.estado = 0;
        this.filas = 0;
        this.columnas = 0;
    }

    // al click
    iniciar() {
        this.boton.addEventListener("click", () => this.gestionarClick());
    }

    // cada click realiza una accion y cambia estado
    gestionarClick() {
        switch (this.estado) {
            // definir filas y columnas
            case 0:
                this.mostrarInputs();
                break;
            // visualizar tablero
            case 1:
                this.generarTablero();
                break;
            // visualizar calles y seleccion de entrada y salida
            case 2:
                this.generarCalles();
                break;
            // aplicacion de AStar
            case 3:
                this.resolver();
                break;
            // reset
            case 4:
                this.reiniciar();
                break;
        }
    }

    mostrarInputs() {

        // Crear inputs para filas y columnas
        this.inputFilas = document.createElement("input");
        this.inputFilas.type = "number";
        this.inputFilas.placeholder = "Filas";
        this.inputFilas.id = "input-filas";
        this.inputFilas.className = "flex border border-blue-300 bg-blue-100 text-blue-900 rounded-xl p-2 m-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400";

        this.inputColumnas = document.createElement("input");
        this.inputColumnas.type = "number";
        this.inputColumnas.placeholder = "Columnas";
        this.inputColumnas.id = "input-columnas";
        this.inputColumnas.className = "flex border border-blue-300 bg-blue-100 text-blue-900 rounded-xl p-2 m-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400";

        // las agregamos al div cuerpo
        this.cuerpo.append(this.inputFilas, this.inputColumnas);

         // cambiamos texto del boton y asignamos el siguiente paso
        this.boton.textContent = "Generar tablero";
        this.estado = 1;
    }

    generarTablero() {

        // guardamos en una variable los inputs
        this.filas = parseInt(this.inputFilas.value);
        this.columnas = parseInt(this.inputColumnas.value);

        // validacion de datos ingresados por usuario
        if (isNaN(this.filas) || isNaN(this.columnas) || this.filas <= 0 || this.columnas <= 0) {
            alert("Introduce números válidos.");
            return;
        }

        // iniciamos la clase simulador y llamamos al metodo generarTablero
        this.simulador = new SimuladorRutas(this.filas, this.columnas, this.contenedor);
        this.simulador.tablero.generarTablero(() => this.estado);

        // removemos los inputs del cuerpo
        this.inputFilas.remove();
        this.inputColumnas.remove();

        // cambiamos texto y asignamos el siguiente paso
        this.boton.textContent = "Generar calles";
        this.estado = 2;
    }

    generarCalles() {

        // llamamos a la funcion generar cuadras y cambiamos texto y estado
        this.simulador.tablero.generarCuadras();
        this.boton.textContent = "Resolver tablero";
        this.estado = 3;
    }

    async resolver() {

        // Validamos que haya una entrada y una salida antes de continuar
        const entrada = document.querySelector('[data-entrada="true"]');
        const salida = document.querySelector('[data-salida="true"]');

        if (!entrada || !salida) {
            alert("Debes seleccionar una entrada (verde) y una salida (roja).");
            return;
        }

        // cambiamos texto y pasamos a siguiente estado
        this.boton.textContent = "Reiniciar tablero";
        this.estado = 4;

        // llamamos a la funcion mover paso a paso
        await this.simulador.moverPasoAPaso();
    }

    reiniciar() {
        this.simulador.tablero.resetearTablero();
    }
}