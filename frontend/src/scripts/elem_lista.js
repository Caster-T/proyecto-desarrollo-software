
console.log("¡El archivo elem_lista.js se cargó correctamente!");

const dialog = document.getElementById("modal-programa");
const formPrograma = document.getElementById("form-programa");
const addProgramBtn = document.querySelector(".add");
const cancelBtn = document.getElementById("btn-cancelar");
const saveBtn = document.getElementById("btn-guardar");
const contenedorProgramas = document.getElementById("programas-container");
const LIMITE = 2;
const programas = [];
//Control de renderizado de programas ^

const modalIamgen = document.getElementById("modal-imagen");
const imagenAmpliada = document.getElementById("img-ampliada")
//Control de imagen ^

const adminControls = document.getElementById("admin-controls");
const btnAdmin = document.getElementById("btn-admin");
let isAdmin = false;
let  idOfEditingProgram = null;
//Control de administrador ^

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
    renderizar();
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
            <img class="card-img" src="${prog.imagenUrl}" alt="${prog.titulo}" style="width: 100%; height: 180px; object-fit: cover; border-radius: 6px;">
            <div class="card-body" style="padding-top: 1rem;">
                <h3>${prog.titulo}</h3>
                <p style="color: #666; font-size: 0.9rem; margin: 0.5rem 0;">Del ${prog.fechaInicio} al ${prog.fechaFinalizar}</p>
                
                ${prog.inscripto 
                    ? `<p style="color: #16a34a; font-weight: bold; text-align: center; margin-top: 0.5rem;">✓ Inscripto</p>`
                    : `<button class="btn btn-enroll" style="width: 100%; margin-top: 0.5rem;">Inscribirse</button>`
                }
                ${isAdmin ? `
                    <div style="display: flex; gap: 0.5rem; margin-top: 0.5rem;">
                        <button class="btn btn-edit-card" style="flex: 1;">Editar programa</button>
                        <button class="btn btn-delete-card" style="flex: 1;">Eliminar programa</button>
                    </div>
                ` : ""}
            </div>
        `;
        
        const imgCard = card.querySelector(".card-img");
        imgCard.addEventListener("click", () => {
            imagenAmpliada.src = prog.imagenUrl;
            modalIamgen.showModal();
        });

        if (!prog.inscripto){

            const enrollBtn = card.querySelector(".btn-enroll");
            //Control de inscripcion para la carta ^
            enrollBtn.addEventListener("click", () => {
                prog.inscripto = true;
                renderizar();
            });
        }

        if (isAdmin){
            const editBtn = card.querySelector(".btn-edit-card");

            editBtn.addEventListener("click", () => {

            idOfEditingProgram = prog.id;
            document.getElementById("input-nombre").value = prog.titulo;
            document.getElementById("input-inicio").value = prog.fechaInicio;
            document.getElementById("input-fin").value = prog.fechaFinalizar;
            document.getElementById("input-form-img").value = "";
            document.getElementById("input-form-img").required = false;
            dialog.showModal();
            });


            

            const dltBtn = card.querySelector(".btn-delete-card");
            dltBtn.addEventListener("click", () => {

                const index = programas.findIndex(p => p.id === prog.id);
                if (index !== 1){
                    programas.splice(index,1);
                }
                addProgramBtn.disabled = programas.length >= LIMITE;
                renderizar();
            });
        }

        contenedorProgramas.appendChild(card);
    });

};


addProgramBtn.addEventListener("click", () => {

    idOfEditingProgram = null;
    formPrograma.reset();
    document.getElementById("input-form-img").required = true
    dialog.showModal();
    
});


formPrograma.addEventListener("submit", (e) => {

    e.preventDefault();

    if (programas.length >= LIMITE) {
        alert("Limite de programas creados");
        return;
    };


    const nombre = document.getElementById("input-nombre").value;
    const inicio = document.getElementById("input-inicio").value;
    const fin = document.getElementById("input-fin").value;
    const img = document.getElementById("input-form-img").files[0];

    const urlTemporal = URL.createObjectURL(img);

    if (idOfEditingProgram !== null){
        const editingProgram = programas.find(p => p.id === idOfEditingProgram);
        if (editingProgram){
            editingProgram.titulo = nombre;
            editingProgram.fechaInicio = inicio;
            editingProgram.fechaFinalizar = fin;
            if (img){
                editingProgram.imagenUrl = URL.createObjectURL(img);
            }
        }
        idOfEditingProgram = null;
    }
    else {
        programas.push({
            id: programas.length+1,
            titulo: nombre,
            fechaInicio: inicio,
            fechaFinalizar: fin,
            imagenUrl: urlTemporal,
            inscripto: false
        });
    }

    renderizar();
    dialog.close();

    if (programas.length >= LIMITE){
        addProgramBtn.disabled = true;
    }

});

cancelBtn.addEventListener("click", () => {
    dialog.close();
});

modalIamgen.addEventListener("click", (e) => {
        if (e.target === modalIamgen) modalIamgen.close();
});

renderizar();
