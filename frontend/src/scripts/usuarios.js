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

const ANALITOS_BASE = [
    { key: "ph", nombre: "pH (a 25°C)", unidad: "u. de pH", metodo: "10" },
    { key: "conductividad", nombre: "Conductividad (a 25°C)", unidad: "µS/cm", metodo: "11" },
    { key: "alcalinidad", nombre: "Alcalinidad total", unidad: "mg CaCO3/L", metodo: "12" },
    { key: "dureza", nombre: "Dureza total", unidad: "mg CaCO3/L", metodo: "12" },
    { key: "calcio", nombre: "Calcio", unidad: "mg Ca/L", metodo: "12" },
    { key: "cloruro", nombre: "Cloruro", unidad: "mg Cl-/L", metodo: "12" },
    { key: "fluoruro", nombre: "Fluoruro", unidad: "mg F-/L", metodo: "X" },
    { key: "nitrato", nombre: "Nitrato", unidad: "mg NO3-/L", metodo: "9" },
    { key: "sulfato", nombre: "Sulfato", unidad: "mg SO42-/L", metodo: "9" },
    { key: "sdt", nombre: "Sólidos Disueltos Totales", unidad: "mg/L", metodo: "13" }
];
//Analitos^

const modalResultados = document.getElementById("modal-resultados");
const formResultados = document.getElementById("form-resultados");
const tbodyAnalitos = document.getElementById("tabla-analitos-body");
const btnCerrar = document.getElementById("btn-cerrar-res");
let programaSeleccionadoForm = null;
//Control de formulario^



const programasCreados = JSON.parse(sessionStorage.getItem("programasSesion")) || [];
programasCreados.forEach(p => {
    datosUsuarioMock.unshift({
        usuario: "Lab Alpha (Lab 1)",
        programa: p.titulo,
        estadoPrograma: "ACTIVO",
        estadoFormulario: "PENDIENTE",
        imagenUrl: "./assets/images.jpg"
    });
});
const programasVigentes = document.getElementById("programas-container");
// Variables para programas vigentes ^

const programasFinalizados = document.getElementById("programas-finalizados");
// const contadorPag = document.querySelector(".contador-pag");
// const btnAnt = document.querySelector(".ant");
// const btnSig = document.querySelector(".sig");
// const LIMIT = 5;
// let paginaActual = 1;
// Variables para historial de programas ^

const modalIamgen = document.getElementById("modal-imagen");
const imagenAmpliada = document.getElementById("img-ampliada")
//Hacer la iamgen grande y no otra pagina ^


function vistaPorUsuario(){
    const usuarioActual = selectUsuario.value;

    if (usuarioActual === "TODOS"){
        listaActualFiltrada = datosUsuarioMock;
    }
    else{
        listaActualFiltrada = datosUsuarioMock.filter(item => item.usuario === usuarioActual);
    }

    paginaActual = 1;

    const vigentes = listaActualFiltrada.filter(item => item.estadoPrograma === "ACTIVO");
    const finalizados = listaActualFiltrada.filter(item => item.estadoPrograma === "FINALIZADO" && item.estadoFormulario === "COMPLETADO");

    renderizarProgramasVigentes(vigentes);
    renderizarProgramasFinalizados(finalizados);
}

selectUsuario.addEventListener("change", vistaPorUsuario);


function renderizarProgramasVigentes(listaPorVisualizar){
    programasVigentes.innerHTML = "";


    if (listaPorVisualizar.length === 0) {
        programasVigentes.innerHTML = `
            <p class="empty-state">Este laboratorio no tiene programas activos en este momento.</p>
        `;
        return;
    }


    listaPorVisualizar.forEach((item) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
        <img class="card-img" src="${item.imagenUrl}" alt="${item.programa}" style="width: 100%; height: 180px; object-fit: cover; border-radius: 6px;">
        <div class="card-body" style="padding-top: 1rem;">
            <span style="font-size: 0.75rem; background: #e0e7ff; color: #3730a3; padding: 2px 6px; border-radius: 4px; font-weight: bold;">
            ${item.usuario}
            </span>
            <h3 style="margin-top: 0.5rem;">${item.programa}</h3>
            <p style="color: #666; font-size: 0.85rem; margin: 0.5rem 0;">
            Programa: <strong>${item.estadoPrograma}</strong> | Form: <strong>${item.estadoFormulario}</strong>
            </p>
            <button class="btn btn-detalle" style="width: 100%; margin-top: 0.5rem;">Ver Detalle</button>
        </div>
        `;

        const btnDetalle = card.querySelector(".btn-detalle");
        btnDetalle.addEventListener("click" , () => {
            abrirFormularioResultados(item.programa);
        });


        programasVigentes.appendChild(card);
    });

}


function renderizarProgramasFinalizados(listaPorVisualizar){
    programasFinalizados.innerHTML = "";

    // const inicio = (paginaActual - 1) * LIMIT;
    // const fin = inicio + LIMIT;
    // const programasPagina = listaPorVisualizar.slice(inicio, fin);
    
    listaPorVisualizar.forEach((item) =>{
        const archivo = document.createElement("li");
        archivo.innerHTML = `
        <span>Programa:${item.programa} | </span>
        <a>Archivo: ${item.pdfUrl}</a>
        `;
        programasFinalizados.appendChild(archivo);
    });
    
    // const totalPaginas = Math.ceil(listaPorVisualizar.length / LIMIT);
    // contadorPag.textContent = `Página ${paginaActual} de ${totalPaginas}`;
    
    // btnAnt.disabled = (paginaActual === 1);
    // btnSig.disabled = (paginaActual === totalPaginas || totalPaginas === 0);
}


// btnAnt.addEventListener("click", function() {
//     const finalizados = listaActualFiltrada.filter(item => item.estadoPrograma === "FINALIZADO" && item.estadoFormulario === "COMPLETADO");
//     if (paginaActual > 1){
//         paginaActual--;
//         renderizarProgramasFinalizados(finalizados);
//     }
// });


// btnSig.addEventListener("click", function() {
//     const finalizados = listaActualFiltrada.filter(item => item.estadoPrograma === "FINALIZADO" && item.estadoFormulario === "COMPLETADO");
//     const totalPaginas = Math.ceil(finalizados.length / LIMIT);
//     if (paginaActual < totalPaginas){
//         paginaActual++;
//         renderizarProgramasFinalizados(finalizados);
//     }
// });

function abrirFormularioResultados(nombrePrograma) {
    programaSeleccionadoForm = nombrePrograma;
    document.getElementById("titulo-modal-form").textContent = `Informe de Resultados - ${nombrePrograma}`;
    tbodyAnalitos.innerHTML = "";

    ANALITOS_BASE.forEach(a => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td style="padding: 4px;"><strong>${a.nombre}</strong></td>
            <td style="padding: 4px; color: #666;">${a.unidad}</td>
            <td style="padding: 4px;"><input type="number" min="0" max="100" step="any" data-key="${a.key}" data-muestra="A" placeholder="0,00" style="width: 85px;"></td>
            <td style="padding: 4px;"><input type="number" min="0" max="100" step="any" data-key="${a.key}" data-muestra="B" placeholder="0,00" style="width: 85px;"></td>
            <td style="padding: 4px;"><input type="text" value="${a.metodo}" style="width: 45px; text-align: center;"></td>
        `;
        tbodyAnalitos.appendChild(tr);
    });

    modalResultados.showModal();
}



formResultados.addEventListener("submit", (e) => {
    e.preventDefault();

    const resultadosPorAnalito = {};

    ANALITOS_BASE.forEach(a => {
        const inputA = tbodyAnalitos.querySelector(`input[data-key="${a.key}"][data-muestra="A"]`);
        const valorA = parseFloat(inputA.value);

        // Si el usuario cargó un número válido para ese analito, generamos la serie de 4 laboratorios
        if (!isNaN(valorA)) {
            resultadosPorAnalito[a.key] = {
                nombre: a.nombre,
                unidad: a.unidad,
                puntos: [
                    { x: 1, y: valorA }, // Laboratorio N° 1 (tu carga real)
                    { x: 2, y: valorA }, // Lab 2 (igual para probar)
                    { x: 3, y: valorA }, // Lab 3 (igual para probar)
                    { x: 4, y: valorA }  // Lab 4 (igual para probar)
                ]
            };
        }
    });

    sessionStorage.setItem("resultadosGraficos", JSON.stringify({
        programa: programaSeleccionadoForm,
        analitos: resultadosPorAnalito
    }));

    alert("Resultados guardados. Entrá a la Página de Gráficos para verlos.");
    modalResultados.close();
});

btnCerrar.addEventListener("click", () => {
    modalResultados.close();
});

// Extra: cierra también si hacés clic en el fondo oscuro afuera del recuadro
modalResultados.addEventListener("click", (e) => {
    if (e.target === modalResultados) {
        modalResultados.close();
    }
});



renderizarProgramasVigentes(datosUsuarioMock);
renderizarProgramasFinalizados(datosUsuarioMock);
vistaPorUsuario();
