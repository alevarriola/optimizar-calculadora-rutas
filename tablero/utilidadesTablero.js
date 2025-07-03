export function encontrarCelda(tablero, tipo) {
    const celda = document.querySelector(`[data-${tipo}="true"]`);
    if (!celda) return null;

    for (let i = 0; i < tablero.length; i++) {
        for (let j = 0; j < tablero[0].length; j++) {
            if (tablero[i][j] === celda) return { x: i, y: j };
        }
    }
    return null;
}

export function resetearTablero() {
    location.reload();
}