import { generarTableroVisual } from './generadorVisual.js';
import { generarCuadras} from './generadorCuadras.js';
import { encontrarCelda, resetearTablero } from './utilidadesTablero.js';

export class Tablero {
    
    // iniciamos nuestra clase con los atributos
    constructor(filas, columnas, contenedor){
        this.filas = filas;
        this.columnas = columnas;
        this.contenedor = contenedor;
        this.tablero = [];
    }

    // funcion para optimizar y no manejar algoritmo con DOM
    generarMatrizEstado() {
        return this.tablero.map(fila => fila.map(celda => {
            if (celda.dataset.ocupado === "true") return 1;
            if (celda.dataset.entrada === "true") return 2;
            if (celda.dataset.salida === "true") return 3;
            return 0;
        }));
    }

    // generar tablero visualmente
    generarTablero(getEstado) {
        generarTableroVisual(this, getEstado);
    }


    // funcion para generar cuadras (celdas ocupadas) en el tablero
    generarCuadras() {
        generarCuadras(this);
    }


    // dependiendo de lo que busque, retornar coordenadas
    encontrarCelda(tipo) {
        return encontrarCelda(this.tablero, tipo);
    }

    // recarga de pagina
    resetearTablero() {
        resetearTablero();
    };
}