const datosUsuarioMock = [
  { usuario: "Lab Alpha", programa: "Control Agua 2026", estadoPrograma: "ACTIVO", estadoFormulario: "COMPLETADO", pdfUrl: null, imagenUrl: "assets/images.jpg" },
  { usuario: "Lab Beta", programa: "Metales Pesados 2026", estadoPrograma: "FINALIZADO", estadoFormulario: "COMPLETADO", pdfUrl: "assets/reporte1.pdf", imagenUrl: "assets/images.jpg" },
  { usuario: "Lab Charlie", programa: "Micropene 2025", estadoPrograma: "FINALIZADO", estadoFormulario: "COMPLETADO", pdfUrl: "assets/reporte2.pdf", imagenUrl: "assets/images.jpg" },
  { usuario: "Lab Gamma", programa: "Suelos 2025", estadoPrograma: "FINALIZADO", estadoFormulario: "COMPLETADO", pdfUrl: null, imagenUrl: "assets/images.jpg" },
  { usuario: "Lab Alpha", programa: "Control Agua 2026", estadoPrograma: "FINALIZADO", estadoFormulario: "COMPLETADO", pdfUrl: null, imagenUrl: "assets/images.jpg" },
  { usuario: "Lab Alpha", programa: "Control SEMEN 2026", estadoPrograma: "FINALIZADO", estadoFormulario: "COMPLETADO", pdfUrl: null, imagenUrl: "assets/images.jpg" },
  { usuario: "Lab Charlie", programa: "Microbiología 2025", estadoPrograma: "FINALIZADO", estadoFormulario: "COMPLETADO", pdfUrl: "assets/reporte2.pdf", imagenUrl: "assets/images.jpg" }, // Este NO se mostrará
];
const selectUsuario = document.getElementById("select-usuario");
let listaActualFiltrada = datosUsuarioMock;
// Variables para usuarios ^

const programasVigentes = document.getElementById("programas-container");
// Variables para programas vigentes ^

const programasFinalizados = document.getElementById("programas-finalizados");
const contadorPag = document.querySelector(".contador-pag");
const btnAnt = document.querySelector(".ant");
const btnSig = document.querySelector(".sig");
const LIMIT = 5;
let paginaActual = 1;
// Variables para historial de programas ^


function vistaPorUsuario(){
    const usuarioActual = selectUsuario.value;

    if (usuarioActual === "TODOS"){
        listaActualFiltrada = datosUsuarioMock;
    }
    else{
        listaActualFiltrada = datosUsuarioMock.filter(item => item.usuario === usuarioActual);
    }

    paginaActual = 1;

    // 3. Llamamos a tus funciones pasándoles la lista ya limpia
    // (También podés filtrar acá mismo por estadoPrograma === "ACTIVO" o "FINALIZADO")
    const vigentes = listaActualFiltrada.filter(item => item.estadoPrograma === "ACTIVO");
    const finalizados = listaActualFiltrada.filter(item => item.estadoPrograma === "FINALIZADO" && item.estadoFormulario === "COMPLETADO");

    renderizarProgramasVigentes(vigentes);
    renderizarProgramasFinalizados(finalizados);
}

selectUsuario.addEventListener("change", vistaPorUsuario);


function renderizarProgramasVigentes(listaPorVisualizar){
    programasVigentes.innerHTML = "";

    listaPorVisualizar.forEach((item) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
        <a href="${item.imagenUrl}" target="_blank" class="card-img-link">
            <img src="${item.imagenUrl}" alt="${item.programa}" style="width: 100%; height: 180px; object-fit: cover; border-radius: 6px;">
        </a>
        <div class="card-body" style="padding-top: 1rem;">
            <span style="font-size: 0.75rem; background: #e0e7ff; color: #3730a3; padding: 2px 6px; border-radius: 4px; font-weight: bold;">
            ${item.usuario}
            </span>
            <h3 style="margin-top: 0.5rem;">${item.programa}</h3>
            <p style="color: #666; font-size: 0.85rem; margin: 0.5rem 0;">
            Programa: <strong>${item.estadoPrograma}</strong> | Form: <strong>${item.estadoFormulario}</strong>
            </p>
            <button class="btn" style="width: 100%; margin-top: 0.5rem;">Ver Detalle</button>
        </div>
        `;
        programasVigentes.appendChild(card);
    });
}


function renderizarProgramasFinalizados(listaPorVisualizar){
    programasFinalizados.innerHTML = "";

    const inicio = (paginaActual - 1) * LIMIT;
    const fin = inicio + LIMIT;
    // Obtenemos solo los ítems del rango actual (ej. del 0 al 5, del 5 al 10, etc.)
    const programasPagina = listaPorVisualizar.slice(inicio, fin);
    
    programasPagina.forEach((item) =>{
        const archivo = document.createElement("li");
        archivo.innerHTML = `
        <span>Programa:${item.programa} | </span>
        <a>Archivo: ${item.pdfUrl}</a>
        `;
        programasFinalizados.appendChild(archivo);
    });
    
    const totalPaginas = Math.ceil(listaPorVisualizar.length / LIMIT);
    contadorPag.textContent = `Página ${paginaActual} de ${totalPaginas}`;
    
    btnAnt.disabled = (paginaActual === 1);
    btnSig.disabled = (paginaActual === totalPaginas || totalPaginas === 0);
}


btnAnt.addEventListener("click", function() {
    const finalizados = listaActualFiltrada.filter(item => item.estadoPrograma === "FINALIZADO" && item.estadoFormulario === "COMPLETADO");
    if (paginaActual > 1){
        paginaActual--;
        renderizarProgramasFinalizados(finalizados);
    }
});


btnSig.addEventListener("click", function() {
    const finalizados = listaActualFiltrada.filter(item => item.estadoPrograma === "FINALIZADO" && item.estadoFormulario === "COMPLETADO");
    const totalPaginas = Math.ceil(finalizados.length / LIMIT);
    if (paginaActual < totalPaginas){
        paginaActual++;
        renderizarProgramasFinalizados(finalizados);
    }
});

renderizarProgramasVigentes(datosUsuarioMock);
renderizarProgramasFinalizados(datosUsuarioMock);
vistaPorUsuario();