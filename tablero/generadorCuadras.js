export function generarCuadras(tableroObj) {
    
    // variable con el tamaño de nuestras cuadras
    const cuadras = [
        { ancho: 3, alto: 3 },
        { ancho: 7, alto: 3 },
        { ancho: 3, alto: 7 },
    ];

    // almacenamos nuestros atribulos filas y columnas
    const { filas, columnas } = tableroObj;

    // recorremos nuestro tablero de 4 en 4
    for (let fila = 0; fila < filas; fila += 4) {
        for (let columna = 0; columna < columnas; columna += 4) {
            const tiposAleatorios = [...cuadras].sort(() => Math.random() - 0.5);

            // verificamos si podemos colocar una cuadra, y si se puede colocamos
            for (const tipo of tiposAleatorios) {
                if (puedeColocarCuadra(tableroObj, fila, columna, tipo.ancho, tipo.alto)) {
                    colocarCuadra(tableroObj, fila, columna, tipo.ancho, tipo.alto);
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

                if (puedeColocarCuadra(tableroObj, fila, colInicio, cuadra.ancho, cuadra.alto)) {
                    colocarCuadra(tableroObj, fila, colInicio, cuadra.ancho, cuadra.alto);
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

                if (puedeColocarCuadra(tableroObj, filaInicio, columna, cuadra.ancho, cuadra.alto)) {
                    colocarCuadra(tableroObj, filaInicio, columna, cuadra.ancho, cuadra.alto);
                    break;
                }
            }
        }
    }
}

function puedeColocarCuadra(tableroObj, filaInicio, colInicio, ancho, alto) {
    const { filas, columnas, tablero } = tableroObj;

    // si la fila de inicion, + el tamaño de nuestra cuadra sale del mapa no colocamos cuadra
    if (filaInicio + alto > filas || colInicio + ancho > columnas) return false;

    // recorremos las filas y columnas que vamos a colocar
    for (let fila = filaInicio; fila < filaInicio + alto; fila++) {
        for (let col = colInicio; col < colInicio + ancho; col++) {
            // si alguna de esas celtas esta ocupada no colocamos la cuadra
            if (tablero[fila][col].dataset.ocupado === "true") return false;
        }
    }
    // si nada se cumple colocamos
    return true;
}

function colocarCuadra(tableroObj, filaInicio, colInicio, ancho, alto) {
    const { tablero } = tableroObj;

    // recorremos nuestras filas y columnas a colocar
    for (let fila = filaInicio; fila < filaInicio + alto; fila++) {
        for (let col = colInicio; col < colInicio + ancho; col++) {
            const celda = tablero[fila][col];

             // las cuadras pintamos de gris y marcamos como ocupado
            celda.classList.add("bg-gray-700");
            celda.dataset.ocupado = "true";
        }
    }
}