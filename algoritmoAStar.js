export class AlgoritmoAStar {
    
    constructor (tablero){ 
        this.tablero = tablero
        this.filas = tablero.filas
        this.columnas = tablero.columnas
        this.celda = tablero.tablero
    }
    // Función heurística: distancia Manhattan
    heuristica(a, b) {
        return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
    }

    encontrarCamino(entrada, salida) {

        // Nodo inicial y final
        const inicio = { x: entrada.x, y: entrada.y, g: 0, f: 0 };
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

                // verificamos que este dentro del tablero
                if (nx < 0 || ny < 0 || nx >= this.filas || ny >= this.columnas) continue;

                // verificamos que no sea una cuadra
                const vecino = this.celda[nx][ny];
                if (vecino.dataset.ocupado === "true") continue;

                // transformamos a key y optenemos su costo en G
                const vecinoKey = key({ x: nx, y: ny });
                const costoG = gScore.get(key(nodoActual)) + 1;

                // si no tiene un gscore, o su score es menos al score ya asignado a esa celda
                if (!gScore.has(vecinoKey) || costoG < gScore.get(vecinoKey)) {

                    // asignamos como nuevo gscore y amacenamos su padre
                    padres.set(vecinoKey, nodoActual);
                    gScore.set(vecinoKey, costoG);

                    // calculamos la heuristica y agregamos a la lista de openset
                    const costoGF = costoG + this.heuristica({x: nx, y: ny}, fin);
                    openSet.push({ x: nx, y: ny, g: costoG, f: costoGF });
                }
            }
        }
        console.warn("No se encontró un camino");
    }

    // con la coordenada que le damos y la lista padre, retornar una lista con el camino a recorrer
    reconstruirCamino(padre, actual) {
        const camino = [actual];

        // mientras mi dato tenga un padre
        while (padre.has(`${actual.x},${actual.y}`)) {
            actual = padre.get(`${actual.x},${actual.y}`);

            // agregamos al comienzo de la lista
            camino.unshift(actual);
        }
        return camino;
    }
}