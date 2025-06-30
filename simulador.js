class simuladorRutas{

    // iniciamos nuestra clase con los atributos
    constructor(filas, columnas, contenedor){
        this.filas = filas;
        this.columnas = columnas;
        this.contenedor = contenedor;
        this.tablero = [];
    }

    generarTablero() {

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
            this.contenedor.appendChild(celda);
            fila.push(celda);
        }
        this.tablero.push(fila);
    }
};
}