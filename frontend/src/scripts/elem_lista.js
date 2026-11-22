
console.log("¡El archivo elem_lista.js se cargó correctamente!");
const btnAdmin = document.getElementById("btn-admin");
const adminControls = document.getElementById("admin-controls");
const addProgramBtn = document.querySelector(".add");
const editProgramBtn = document.querySelector(".edit");
const contenedorProgramas = document.getElementById("programas-container");
const LIMITE = 3;
const programas = [];
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
        contenedorProgramas.innerHTML = `<p class="empty-state">No hay programas NIGGER</p>`
        return;
    }

    programas.forEach((prog) => {
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

};

addProgramBtn.addEventListener("click", () => {

    const numeroPrograma = programas.length + 1;
    programas.push({
        id: numeroPrograma,
        titulo: `Programa numero ${numeroPrograma}`,
        imagenUrl: "./assets/images.jpg"
    });
    
    if (programas.length >= LIMITE) return;

    renderizar();   
});


renderizar();