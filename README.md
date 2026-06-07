INSTRUCCIONES DE USO

Para testear y evaluar el proyecto del analizador, se deben utilizar los archivos de texto de ejemplo (.txt) que se encuentran ubicados en la carpeta principal del repositorio.

Asegúrese de tener su terminal ubicada dentro de la carpeta "Analizador" y ejecute el programa principal (index.js) pasándole la ruta del archivo que desea evaluar.

Para ejecutar el primer ejemplo correcto:

node index.js ../input_correcto_1.txt

Para probar el resto de los casos provistos:

node index.js ../input_correcto_2.txt

node index.js ../input_incorrecto_1.txt

node index.js ../input_incorrecto_2.txt

Al ejecutar los casos correctos, el programa realizará el análisis léxico/sintáctico, mostrará la tabla de lexemas-tokens, imprimirá el árbol de derivación en formato texto y finalmente ejecutará la traducción a código JavaScript nativo.
