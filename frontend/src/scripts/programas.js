const datosUsuarioMock = [
  { programa: "Control Agua 2026", pdfUrl: "assets/images.jpg", fecha: 2026 },
  { programa: "Metales Pesados 2026", pdfUrl: "assets/images.jpg", fecha: 2026 },
  { programa: "Micropene 2025", pdfUrl: "assets/images.jpg", fecha: 2025 },
  { programa: "Suelos 2025", pdfUrl: "assets/images.jpg", fecha: 2025},
  { programa: "Control Agua 2026", pdfUrl: "assets/images.jpg", fecha: 2026 },
  { programa: "Control SEMEN 2026", pdfUrl: "assets/images.jpg", fecha: 2026 },
  { programa: "Microbiología 2025", pdfUrl: "assets/images.jpg", fecha: 2025 }, // Este NO se mostrará
];

const programasFinalizados = document.getElementById("programas-finalizados");
//Control de elementos de lista para cargar los programas terminados y subidos^

datosUsuarioMock.sort((a, b) => b.fecha - a.fecha);
const LIMITE = 5;
//Control de muestra en la lista^


function renderizar(){

    programasFinalizados.innerHTML = "";

    if (datosUsuarioMock.length === 0){
        programasFinalizados.innerHTML = 'No hay programas para visualizar';
        return;
    }

    datosUsuarioMock.forEach((dato) => {
        const li = document.createElement("li");
        if (dato.pdfUrl !== null){
        programasFinalizados.appendChild(li);
        li.innerHTML = `
        <strong>${dato.programa}</strong> 
        <a href="${dato.pdfUrl}" target="_blank" rel="noopener noreferrer" style="color: #2563eb; text-decoration: underline;">
            Ver comprobante (${dato.pdfUrl.split('/').pop()})
        </a>
        `;
        }
    });

}

renderizar();