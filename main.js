// 3 variables para nuestros 3 componentes en html
const boton = document.getElementById("boton-principal");
const contenedor = document.getElementById("tablero");
const cuerpo = document.getElementById("cuerpo")

// una variable para la accion del boton principal
let estado = 0;

// nuestras 3 cariables globales
let tablero = [];
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

        // llamamos a la funcion generar tablero
        generarTablero(filas, columnas);

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
        generarCuadras(tablero, filas, columnas);

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

        moverPasoAPaso(tablero, filas, columnas);

        boton.textContent = "Reiniciar tablero"; 
        estado = 4;
     }

     // damos click a resetear tablero
     else if (estado === 4) {
        resetearTablero();
     }
});


function generarTablero(filas, columnas) {

    // definimos nuestro contenedor para el tablero
    contenedor.style.display = "grid";
    contenedor.style.gridTemplateColumns = `repeat(${columnas}, 20px)`;
    contenedor.style.gridTemplateRows  = `repeat(${filas}, 20px)`;

    // recorremos nuestro tablero 
    for (let i = 0; i < filas; i++) {
         const fila = [];

        for (let j = 0; j < columnas; j++) {

            // Crear elemento celda
            const celda = document.createElement("button");
            celda.className = "bg-blue-100 border border-white";
            celda.style.width = "20px";
            celda.style.height = "20px";

            // cada celda tiene esta funcion adentro
            celda.addEventListener("click", function () {
                if (estado === 3) {
                    // Definir entrada o salida
                    if (!document.querySelector('[data-entrada="true"]')) {
                        celda.classList.add("bg-green-700");
                        celda.dataset.entrada = "true";
                    } else if (!document.querySelector('[data-salida="true"]')) {
                        celda.classList.add("bg-red-700");
                        celda.dataset.salida = "true";
                    }

                } else if (estado === 4) {
                    // Alternar como celda ocupada
                    celda.classList.toggle("bg-gray-400");
                    celda.dataset.ocupado = celda.dataset.ocupado === "true" ? "false" : "true";
                }
            });

            // Agregarlo al body
            contenedor.appendChild(celda);
            fila.push(celda);
        }
        tablero.push(fila);
    }
};

function generarCuadras(tablero, filas, columnas) {
    // variable con el tamaño de nuestras cuadras
    const cuadras = [
        { ancho: 3, alto: 3 },
        { ancho: 7, alto: 3 },
        { ancho: 3, alto: 7 },
    ];

    // recorremos nuestro tablero de 4 en 4
    for (let fila = 0; fila < filas; fila += 4) {
        for (let columna = 0; columna < columnas; columna += 4) {

            // mezclamos nuestras cuadras
            const tiposAleatorios = [...cuadras].sort(() => Math.random() - 0.5);

            // verificamos si podemos colocar una cradra
            for (const tipo of tiposAleatorios) {
                if (puedeColocarCuadra(tablero, fila, columna, tipo.ancho, tipo.alto, filas, columnas)) {

                    // la colocamos y rompemos el bucle for
                    colocarCuadra(tablero, fila, columna, tipo.ancho, tipo.alto);
                    break; 
                }
            }
        }
    }
    // rellenamos bordes horizontales
    for (let fila = 0; fila < filas; fila += 4) {
        
        // verificamos el resto de columnas
        const colRestante = columnas % 4;
        const colInicio = columnas - colRestante;

        // si el resto es mayor a 0
        if (colRestante > 0) {

            // probamos colocar 3 bloques, 2 0 1
            for (let alto = 3; alto >= 1; alto--) {
                const cuadra = { ancho: colRestante, alto: alto };

                if (puedeColocarCuadra(tablero, fila, colInicio, cuadra.ancho, cuadra.alto, filas, columnas)) {
                    colocarCuadra(tablero, fila, colInicio, cuadra.ancho, cuadra.alto);
                    break;
                }
            }
        }
    }

    // rellenamos bordes verticales 
    for (let columna = 0; columna < columnas; columna += 4) {
        const filaRestante = filas % 4;
        const filaInicio = filas - filaRestante;

        if (filaRestante > 0) {
            for (let ancho = 3; ancho >= 1; ancho--) {
                const cuadra = { ancho: ancho, alto: filaRestante };

                if (puedeColocarCuadra(tablero, filaInicio, columna, cuadra.ancho, cuadra.alto, filas, columnas)) {
                    colocarCuadra(tablero, filaInicio, columna, cuadra.ancho, cuadra.alto);
                    break;
                }
            }
        }
    }
}

function puedeColocarCuadra(tablero, filaInicio, colInicio, ancho, alto, filasTotales, columnasTotales) {

    // si la fila de inicion, + el tamaño de nuestra cuadra sale del mapa no colocamos cuadra
    if (filaInicio + alto > filasTotales || colInicio + ancho > columnasTotales) return false;

    // recorremos las filas y columnas que vamos a colocar
    for (let filaColocar = filaInicio; filaColocar < filaInicio + alto; filaColocar++) {
        for (let colColocar = colInicio; colColocar < colInicio + ancho; colColocar++) {
            const celda = tablero[filaColocar][colColocar];
            // si alguna de esas celtas esta ocupada no colocamos la cuadra
            if (celda.dataset.ocupado === "true") return false;
        }
    }
    // si nada se cumple colocamos
    return true;
}

function colocarCuadra(tablero, filaInicio, colInicio, ancho, alto) {

    // recorremos nuestras filas y columnas a colocar
    for (let fila = filaInicio; fila < filaInicio + alto; fila++) {
        for (let columna = colInicio; columna < colInicio + ancho; columna++) {
            const celda = tablero[fila][columna];

            // las cuadras pintamos de gris y marcamos como ocupado
            celda.classList.add("bg-gray-700") 
            celda.dataset.ocupado = "true"; 
        }
    }
}

async function moverPasoAPaso(tablero, filas, columnas) {
    
    let actual = encontrarCelda("entrada");

    while (true) {
        // guardamos la variable salida y verificamos si existe
        const salida = encontrarCelda("salida");
        if (!salida) return;

        // optenemos el camino y verificamos que exista
        const camino = encontrarCamino(tablero, filas, columnas, actual, salida);
        if (!camino || camino.length < 2) {
            console.warn("No hay camino disponible");
            return;
        }

        // Avanzamos al siguiente paso
        const siguiente = camino[1];
        actual = siguiente;

        // cambiamos el color de la celda
        const celda = tablero[siguiente.x][siguiente.y];
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

function encontrarCamino(tablero, filas, columnas, entrada, salida) {

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
            return reconstruirCamino(padres, nodoActual);
        }

        // si no, recorremos todos sus vecinos
        for (const [dx, dy] of [[0,1], [1,0], [0,-1], [-1,0]]) {
            const nx = nodoActual.x + dx;
            const ny = nodoActual.y + dy;

            // verificamos que este dentro del tablero
            if (nx < 0 || ny < 0 || nx >= filas || ny >= columnas) continue;

            // verificamos que no sea una cuadra
            const vecino = tablero[nx][ny];
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
                const costoGF = costoG + heuristica({x: nx, y: ny}, fin);
                openSet.push({ x: nx, y: ny, g: costoG, f: costoGF });
            }
        }
    }
    console.warn("No se encontró un camino");
}

// Función heurística: distancia Manhattan
function heuristica(a, b) {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

// dependiendo de lo que busque, retornar coordenadas
function encontrarCelda(tipo) {
    const celda = document.querySelector(`[data-${tipo}="true"]`);
    if (!celda) return null;

    for (let i = 0; i < tablero.length; i++) {
        for (let j = 0; j < tablero[0].length; j++) {
            if (tablero[i][j] === celda) return { x: i, y: j };
        }
    }
    return null;
}

// con la coordenada que le damos y la lista padre, retornar una lista con el camino a recorrer
function reconstruirCamino(padre, actual) {
    const camino = [actual];

    // mientras mi dato tenga un padre
     while (padre.has(`${actual.x},${actual.y}`)) {
        actual = padre.get(`${actual.x},${actual.y}`);

        // agregamos al comienzo de la lista
        camino.unshift(actual);
    }
    return camino;
}

function resetearTablero() {
    location.reload();
};