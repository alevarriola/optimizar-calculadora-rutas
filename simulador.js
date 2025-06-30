import { Tablero } from "./tablero.js";
import { AlgoritmoAStar } from "./algoritmoAStar.js";

export class SimuladorRutas{

    constructor(filas, columnas, contenedor){
        this.tablero = new Tablero(filas, columnas, contenedor);
        this.algoritmo = new AlgoritmoAStar(this.tablero);
    }

    async moverPasoAPaso() {
        
        let actual = this.tablero.encontrarCelda("entrada");

        while (true) {
            // guardamos la variable salida y verificamos si existe
            const salida = this.tablero.encontrarCelda("salida");
            if (!salida) return;

            // optenemos el camino y verificamos que exista
            const camino = this.algoritmo.encontrarCamino(actual, salida);
            if (!camino || camino.length < 2) {
                console.warn("No hay camino disponible");
                return;
            }

            // Avanzamos al siguiente paso
            const siguiente = camino[1];
            actual = siguiente;

            // cambiamos el color de la celda
            const celda = this.tablero.tablero[siguiente.x][siguiente.y];
            celda.classList.add("bg-green-400");

            // si es la salida rompemos el buble
            if (celda.dataset.salida === "true") {
                console.log("Llegamos a la salida");
                break;
            }

            // esperamos 0.3 seg
            await new Promise((res) => setTimeout(res, 300));
        }
    }
};