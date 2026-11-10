
console.log("¡El archivo elem_lista.js se cargó correctamente!");

const primerBoton = document.querySelector(".btn-primary");
const segundoBoton = document.querySelector(".btn-secondary");
const primerLista = document.querySelector(".primer-lista");
const botonAnt = document.querySelector(".ant");
const botonSig = document.querySelector(".sig");
const contadorPag = document.querySelector(".contador-pag");
const LIMITE = 5;
const items = [];
let paginaActual = 1;
let contador = 0;

function renderizar() {
    primerLista.innerHTML = "";

    if (items.length === 0){
        primerLista.innerHTML = "<li>No hay elementos NIGGER</li>";
        contadorPag.textContent = "Pag 1 de 1";
        return;
    }

    const inicio = (paginaActual - 1) * LIMITE;
    const fin = inicio + LIMITE;
    
    // Obtenemos solo los ítems del rango actual (ej. del 0 al 5, del 5 al 10, etc.)
    const itemsPagina = items.slice(inicio, fin);

    // Creamos los <li> en el DOM para la página activa
    itemsPagina.forEach(itemText => {
        const li = document.createElement("li");
        li.textContent = itemText;
        primerLista.appendChild(li);
    });

    const totalPaginas = Math.ceil(items.length / LIMITE);
    contadorPag.textContent = `Página ${paginaActual} de ${totalPaginas}`;
    
    botonAnt.disabled = (paginaActual === 1);
    botonSig.disabled = (paginaActual === totalPaginas || totalPaginas === 0);
}

botonAnt.addEventListener("click", function() {
    if (paginaActual > 1){
        paginaActual--;
        renderizar();
    }
});

botonSig.addEventListener("click", function() {
    const totalPaginas = Math.ceil(items.length / LIMITE);
    if (paginaActual < totalPaginas){
        paginaActual++;
        renderizar();
    }
});

renderizar();

primerBoton.addEventListener("click", function() {
    
    // Cambiamos el texto del h1 cuando se hace clic en el botón
    if (contador === 0){
        tituloPrincipal.textContent = "¡Texto cambiado con JavaScript! 🚀";
        tituloPrincipal.style.color = "#9225eb";
        contador = 1;
    }
    else{
        tituloPrincipal.textContent = "Estructura Base HTML & CSS";
        tituloPrincipal.style.color = "#ffffff";
        contador = 0;
    } 
    
});



segundoBoton.addEventListener("click", function() {
    const nuevoItem = items.length +1;
    items.push(`Elemento numero ${nuevoItem}`);

    const totalPaginas = Math.ceil(items.length / LIMITE);
    paginaActual = totalPaginas;

    renderizar();
});