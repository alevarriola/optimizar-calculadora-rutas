# Optimizar Calculadora de Rutas 

Este proyecto es una evolución del repositorio [Calculadora de Rutas](https://github.com/alevarriola/Calculadora-de-Rutas), con el objetivo de mejorar su estructura, claridad y funcionamiento mediante **modularización**, **programación orientada a objetos (POO)** y una interfaz visual más sólida.

---

## Objetivo

Simular un sistema de rutas que permite:

- Generar dinámicamente un tablero con calles y cuadras.
- Definir una entrada y una salida.
- Usar el algoritmo **A*** para encontrar el camino más corto.
- Visualizar el recorrido paso a paso, en tiempo real.
- Modificar obstáculos incluso durante la ejecución del algoritmo.

---

##  Tecnologías usadas

- HTML5 + JavaScript (ES Modules)
- TailwindCSS (usado solo en desarrollo)
- Programación Orientada a Objetos (POO)
- Estructura modular con archivos separados por responsabilidad

---

## Arquitectura

El proyecto se divide en módulos clave:

- `/algoritmo/`: contiene la implementación del algoritmo A*, y clases base como `AlgoritmoBusqueda`.
- `/tablero/`: contiene la clase `Tablero` y sus funciones asociadas para pintar cuadras, interpretar estados y modificar el DOM.
- `controladorUI.js`: contiene el controlador para el flujo de la interfaz.
- `simulador.js`: integra tablero + algoritmo y gestiona la simulación paso a paso.
- `main.js`: llama a la clase controlador para gestiona la interfaz principal y el botón único que controla todo el flujo.

---

##  Cómo usar

1. Cloná el repositorio:
   ```bash
   git clone https://github.com/alevarriola/optimizar-calculadora-rutas.git
   cd optimizar-calculadora-rutas
   ```
Abrí el archivo index.html en tu navegador (recomendado usar Live Server o similar).
Usá el botón "Iniciar" y seguí el flujo:

    Elegí dimensiones del tablero.

    Generá el tablero.

    Generá las calles y cuadras.

    Definí una entrada (verde) y una salida (roja).

    Ejecutá la resolución paso a paso.

    Podés colocar obstáculos incluso durante la resolución.

##  Mejoras con respecto al proyecto anterior

| **Anterior (`Calculadora-de-Rutas`)**                            | **Actual (`Optimizar Calculadora de Rutas`)**                         |
|------------------------------------------------------------------|------------------------------------------------------------------------|
| Código todo en un solo archivo                                   | Código modular separado por responsabilidades                         |
| Dificultad para mantener y escalar                               | Clases limpias, reutilizables y orientadas a objetos                  |
| No se podía visualizar el algoritmo en acción                    | Recorrido paso a paso visual con colores diferenciados                |
| Algoritmo poco flexible y acoplado                               | Uso de clases base que permiten extender fácilmente otros algoritmos  |

---


## Autor

Alejandro A.

Programador en constante formación.

GitHub: @alevarriola

---

## Licencia

Este proyecto está bajo la Licencia MIT.
Consultá el archivo LICENSE para más información.

---
