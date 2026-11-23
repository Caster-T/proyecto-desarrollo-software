console.log("¡El archivo script.js se cargó correctamente!");

const todosLosInputs = document.querySelectorAll("input");

todosLosInputs.forEach(function(inputIndividual) {
    inputIndividual.addEventListener("input", function(e) {
        console.log(`Escribiendo en ${e.target.name || e.target.type}:`, e.target.value);
    });
});

const mensaje = document.querySelector("textarea");

if (mensaje) {
    mensaje.addEventListener("input", function(e){
        console.log(`El usuario esta escribiendo en ${e.target.name}:`,e.target.value);
    });
}
