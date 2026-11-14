
console.log("¡El archivo elem_lista.js se cargó correctamente!");
const btnAdmin = document.getElementById("btn-admin");
const adminControls = document.getElementById("admin-controls");
const addProgramBtn = document.querySelector(".add");
const editProgramBtn = document.querySelector(".edit");
const contenedorProgramas = document.getElementById("programas-container");
const btnAnt = document.querySelector(".ant");
const btnSig = document.querySelector(".sig");
const contadorPag = document.querySelector(".contador-pag");
const LIMITE = 3;
const programas = [];
let paginaActual = 1;
let isAdmin = false;

btnAdmin.addEventListener("click", () =>{
    isAdmin = !isAdmin;
    if(isAdmin){
        btnAdmin.textContent = "Modo diablo";
        adminControls.style.display = "flex";
    }
    else{
        btnAdmin.textContent = "Modo nigga";
        adminControls.style.display = "none";
    }
});


function renderizar() {
    contenedorProgramas.innerHTML = "";

    if (programas.length === 0){
        contenedorProgramas.innerHTML = "<p>No hay elementos NIGGER</p>";
        contadorPag.textContent = "Pag 1 de 1";
        btnAnt.disabled = true;
        btnSig.disabled = true;
        return;
    }

    const inicio = (paginaActual - 1) * LIMITE;
    const fin = inicio + LIMITE;
    // Obtenemos solo los ítems del rango actual (ej. del 0 al 5, del 5 al 10, etc.)
    const programasPagina = programas.slice(inicio, fin);

    programasPagina.forEach((prog) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <a href="${prog.imagenUrl}" target="_blank" class="card-img-link">
            <img src="${prog.imagenUrl}" alt="${prog.titulo}" style="width: 100%; height: 180px; object-fit: cover; border-radius: 6px;">
            </a>
            <div class="card-body" style="padding-top: 1rem;">
                <h3>${prog.titulo}</h3>
                <p style="color: #666; font-size: 0.9rem; margin: 0.5rem 0;">${prog.descripcion}</p>
                <button class="btn" style="width: 100%; margin-top: 0.5rem;">Inscribirse</button>
            </div>
        `;
        contenedorProgramas.appendChild(card);
    });

    const totalPaginas = Math.ceil(programas.length / LIMITE);
    contadorPag.textContent = `Página ${paginaActual} de ${totalPaginas}`;
    
    btnAnt.disabled = (paginaActual === 1);
    btnSig.disabled = (paginaActual === totalPaginas || totalPaginas === 0);
};

addProgramBtn.addEventListener("click", () => {

    const numeroPrograma = programas.length + 1;
    programas.push({
        id: numeroPrograma,
        titulo: `Programa numero ${numeroPrograma}`,
        imagenUrl: "./assets/images.jpg"
    });
    

    paginaActual = Math.ceil(programas.length / LIMITE);

    renderizar();   
});


btnAnt.addEventListener("click", function() {
    if (paginaActual > 1){
        paginaActual--;
        renderizar();
    }
});


btnSig.addEventListener("click", function() {
    const totalPaginas = Math.ceil(programas.length / LIMITE);
    if (paginaActual < totalPaginas){
        paginaActual++;
        renderizar();
    }
});



renderizar();

// editProgramBtn.addEventListener("click", function() {



// });