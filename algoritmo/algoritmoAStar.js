import { Nodo } from './nodo.js';
import { AlgoritmoBusqueda } from './algoritmoBusqueda.js';

export class AlgoritmoAStar extends AlgoritmoBusqueda {
    
    #matriz;
    #filas;
    #columnas;

    constructor (matriz){ 
        super(); // Obligatorio al heredar
        this.#matriz = matriz;
        this.#filas = matriz.length;
        this.#columnas = matriz[0].length;
    }
    // Función heurística: distancia Manhattan
    #heuristica(a, b) {
        return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
    }

    // algoritmo AStar
    encontrarCamino(entrada, salida) {

        // Nodo inicial y final
        const inicio = new Nodo(entrada.x, entrada.y, 0, 0)
        const fin = { x: salida.x, y: salida.y };

        // lista de lugares a explorar y diccionario donde guardamos el padre
        const openSet = [inicio];
        const padres = new Map();

        // una cordenada otrogada transformamos a texto, e iniciamos nuestro gscore
        const key = (coord) => `${coord.x},${coord.y}`;
        const gScore = new Map();
        gScore.set(key(inicio), 0);


        while (openSet.length > 0) {
            // ordenamos por f mas baja
            openSet.sort((a, b) => a.f - b.f);
            const nodoActual = openSet.shift();

            // si es la salida retornamos la lista del camino
            if (nodoActual.x === fin.x && nodoActual.y === fin.y) {
                return this.reconstruirCamino(padres, nodoActual);
            }

            // si no, recorremos todos sus vecinos
            for (const [dx, dy] of [[0,1], [1,0], [0,-1], [-1,0]]) {
                const nx = nodoActual.x + dx;
                const ny = nodoActual.y + dy;

                // verificamos que este dentro del tablero y no sea obstaculo
                if (!this.#esValido(nx, ny)) continue;

                // transformamos a key y optenemos su costo en G
                const vecinoKey = key({ x: nx, y: ny });
                const costoG = gScore.get(key(nodoActual)) + 1;

                // si no tiene un gscore, o su score es menos al score ya asignado a esa celda
                if (!gScore.has(vecinoKey) || costoG < gScore.get(vecinoKey)) {

                    // asignamos como nuevo gscore y amacenamos su padre
                    padres.set(vecinoKey, nodoActual);
                    gScore.set(vecinoKey, costoG);

                    // calculamos la heuristica y agregamos a la lista de openset
                    const costoGF = costoG + this.#heuristica({x: nx, y: ny}, fin);
                    const nodo = new Nodo(nx, ny, costoG, costoGF)
                    openSet.push(nodo);
                }
            }
        }
        console.warn("No se encontró un camino");
        return null;
    }

    // metodo para verificar que este dentro del tablero y no sea un obstaculo
    #esValido(x, y) {
        return (
            x >= 0 && y >= 0 &&
            x < this.#filas && y < this.#columnas &&
            this.#matriz[x][y] !== 1
        );
    }
}