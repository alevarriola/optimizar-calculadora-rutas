export class Tablero {
    
    // iniciamos nuestra clase con los atributos
    constructor(filas, columnas, contenedor){
        this.filas = filas;
        this.columnas = columnas;
        this.contenedor = contenedor;
        this.tablero = [];
    }

    generarTablero(getEstado) {

        // definimos nuestro contenedor para el tablero
        this.contenedor.innerHTML = "";
        this.contenedor.style.display = "grid";
        this.contenedor.style.gridTemplateColumns = `repeat(${this.columnas}, 20px)`;
        this.contenedor.style.gridTemplateRows  = `repeat(${this.filas}, 20px)`;

        // recorremos nuestro tablero 
        for (let i = 0; i < this.filas; i++) {
            const fila = [];

            for (let j = 0; j < this.columnas; j++) {

                // Crear elemento celda
                const celda = document.createElement("button");
                celda.className = "bg-blue-100 border border-white";
                celda.style.width = "20px";
                celda.style.height = "20px";

                // cada celda tiene esta funcion adentro
                celda.addEventListener("click", () => {
                    const estadoActual = getEstado();
                    if (estadoActual === 3) {
                        // Definir entrada o salida
                        if (!document.querySelector('[data-entrada="true"]')) {
                            celda.classList.add("bg-green-700");
                            celda.dataset.entrada = "true";
                        } else if (!document.querySelector('[data-salida="true"]')) {
                            celda.classList.add("bg-red-700");
                            celda.dataset.salida = "true";
                        }

                    } else if (estadoActual === 4) {
                        // Alternar como celda ocupada
                        celda.classList.toggle("bg-gray-400");
                        celda.dataset.ocupado = celda.dataset.ocupado === "true" ? "false" : "true";
                    }
                });

                // Agregarlo al body
                this.contenedor.appendChild(celda);
                fila.push(celda);
            }
            this.tablero.push(fila);
        }
    }

    generarCuadras() {
        // variable con el tamaño de nuestras cuadras
        const cuadras = [
            { ancho: 3, alto: 3 },
            { ancho: 7, alto: 3 },
            { ancho: 3, alto: 7 },
        ];

        // recorremos nuestro tablero de 4 en 4
        for (let fila = 0; fila < this.filas; fila += 4) {
            for (let columna = 0; columna < this.columnas; columna += 4) {

                // mezclamos nuestras cuadras
                const tiposAleatorios = [...cuadras].sort(() => Math.random() - 0.5);

                // verificamos si podemos colocar una cradra
                for (const tipo of tiposAleatorios) {
                    if (this.puedeColocarCuadra(fila, columna, tipo.ancho, tipo.alto)) {

                        // la colocamos y rompemos el bucle for
                        this.colocarCuadra(fila, columna, tipo.ancho, tipo.alto);
                        break; 
                    }
                }
            }
        }
        // rellenamos bordes horizontales
        for (let fila = 0; fila < this.filas; fila += 4) {
            
            // verificamos el resto de columnas
            const colRestante = this.columnas % 4;
            const colInicio = this.columnas - colRestante;

            // si el resto es mayor a 0
            if (colRestante > 0) {

                // probamos colocar 3 bloques, 2 0 1
                for (let alto = 3; alto >= 1; alto--) {
                    const cuadra = { ancho: colRestante, alto: alto };

                    if (this.puedeColocarCuadra(fila, colInicio, cuadra.ancho, cuadra.alto)) {
                        this.colocarCuadra(fila, colInicio, cuadra.ancho, cuadra.alto);
                        break;
                    }
                }
            }
        }

        // rellenamos bordes verticales 
        for (let columna = 0; columna < this.columnas; columna += 4) {
            const filaRestante = this.filas % 4;
            const filaInicio = this.filas - filaRestante;

            if (filaRestante > 0) {
                for (let ancho = 3; ancho >= 1; ancho--) {
                    const cuadra = { ancho: ancho, alto: filaRestante };

                    if (this.puedeColocarCuadra(filaInicio, columna, cuadra.ancho, cuadra.alto)) {
                        this.colocarCuadra(filaInicio, columna, cuadra.ancho, cuadra.alto);
                        break;
                    }
                }
            }
        }
    }

    puedeColocarCuadra(filaInicio, colInicio, ancho, alto) {

        // si la fila de inicion, + el tamaño de nuestra cuadra sale del mapa no colocamos cuadra
        if (filaInicio + alto > this.filas || colInicio + ancho > this.columnas) return false;

        // recorremos las filas y columnas que vamos a colocar
        for (let filaColocar = filaInicio; filaColocar < filaInicio + alto; filaColocar++) {
            for (let colColocar = colInicio; colColocar < colInicio + ancho; colColocar++) {
                const celda = this.tablero[filaColocar][colColocar];
                // si alguna de esas celtas esta ocupada no colocamos la cuadra
                if (celda.dataset.ocupado === "true") return false;
            }
        }
        // si nada se cumple colocamos
        return true;
    }

    colocarCuadra(filaInicio, colInicio, ancho, alto) {

        // recorremos nuestras filas y columnas a colocar
        for (let fila = filaInicio; fila < filaInicio + alto; fila++) {
            for (let columna = colInicio; columna < colInicio + ancho; columna++) {
                const celda = this.tablero[fila][columna];

                // las cuadras pintamos de gris y marcamos como ocupado
                celda.classList.add("bg-gray-700") 
                celda.dataset.ocupado = "true"; 
            }
        }
    }
    
    // dependiendo de lo que busque, retornar coordenadas
    encontrarCelda(tipo) {
        const celda = document.querySelector(`[data-${tipo}="true"]`);
        if (!celda) return null;

        for (let i = 0; i < this.tablero.length; i++) {
            for (let j = 0; j < this.tablero[0].length; j++) {
                if (this.tablero[i][j] === celda) return { x: i, y: j };
            }
        }
        return null;
    }

    resetearTablero() {
        location.reload();
    };
}