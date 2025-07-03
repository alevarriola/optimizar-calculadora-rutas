export function generarTableroVisual(tableroObj, getEstado) {
    
    // rescatamos nuestros artibutos del objeto tablero
    const { filas, columnas, contenedor, tablero } = tableroObj;

    // definimos nuestro contenedor para el tablero
    contenedor.innerHTML = "";
    contenedor.style.display = "grid";
    contenedor.style.gridTemplateColumns = `repeat(${columnas}, 20px)`;
    contenedor.style.gridTemplateRows = `repeat(${filas}, 20px)`;

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
            celda.addEventListener("click", () => {
                const estadoActual = getEstado();

                // Definir entrada o salida
                if (estadoActual === 3) {
                    if (!document.querySelector('[data-entrada="true"]')) {
                        celda.classList.add("bg-green-700");
                        celda.dataset.entrada = "true";
                    } else if (!document.querySelector('[data-salida="true"]')) {
                        celda.classList.add("bg-red-700");
                        celda.dataset.salida = "true";
                    }

                // Alternar como celda ocupada
                } else if (estadoActual === 4) {
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
}