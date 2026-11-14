// ==========================================
// 1. VERIFICAR QUE EL ARCHIVO ESTÁ CONECTADO
// ==========================================
// console.log() imprime mensajes en la consola del navegador (F12)
console.log("¡El archivo script.js se cargó correctamente!");

const tituloPrincipal = document.querySelector(".titulo");

// ==========================================
// 4. INTERACTUAR CON UN INPUT (FORMULARIO)
// ==========================================
const todosLosInputs = document.querySelectorAll("input");

todosLosInputs.forEach(function(inputIndividual) {
    inputIndividual.addEventListener("input", function(e) {
        // e.target contiene el input exacto en el que el usuario está escribiendo
        console.log(`Escribiendo en ${e.target.name || e.target.type}:`, e.target.value);
    });
});

const mensaje = document.querySelector("textarea");

if (mensaje) {
    mensaje.addEventListener("input", function(e){
        console.log(`El usuario esta escribiendo en ${e.target.name}:`,e.target.value);
    });
}
