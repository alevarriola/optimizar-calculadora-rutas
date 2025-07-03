export class AlgoritmoBusqueda {
    
  reconstruirCamino(padre, actual) {
    const camino = [actual];
    while (padre.has(`${actual.x},${actual.y}`)) {
      actual = padre.get(`${actual.x},${actual.y}`);
      camino.unshift(actual);
    }
    return camino;
  }
}