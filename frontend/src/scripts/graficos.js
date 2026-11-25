const datosSimulados = [
  { laboratorio: "Lab Alpha",   ph: 7.1, plomo: 0.004 },
  { laboratorio: "Lab Beta",    ph: 7.4, plomo: 0.009 },
  { laboratorio: "Lab Gamma",   ph: 6.8, plomo: 0.002 },
  { laboratorio: "Lab Delta",   ph: 7.9, plomo: 0.015 },
  { laboratorio: "Lab Épsilon", ph: 7.2, plomo: 0.006 }
];

const contenedorGraficos = document.getElementById("contenedor-graficos-dinamicos");
const dataGuardada = JSON.parse(sessionStorage.getItem("resultadosGraficos"));

datosSimulados.sort((a, b) => a.ph - b.ph);

// 2. Separamos los datos para el Gráfico de Barras
const nombresLabs = datosSimulados.map(item => item.laboratorio);
const valoresPh = datosSimulados.map(item => item.ph);

const ctxBarras = document.getElementById("grafico-barras");

if (dataGuardada && Object.keys(dataGuardada.analitos).length > 0) {
    contenedorGraficos.innerHTML = ""; // Limpia los gráficos hardcodeados si hay datos de sesión

    Object.values(dataGuardada.analitos).forEach((analito, idx) => {
        // 1. Creamos una tarjeta con su propio <canvas>
        const card = document.createElement("div");
        card.classList.add("card");
        card.style.padding = "1rem";
        card.innerHTML = `
            <h4 style="margin-bottom: 0.5rem;">${dataGuardada.programa} — ${analito.nombre}</h4>
            <canvas id="chart-dinamico-${idx}"></canvas>
        `;
        contenedorGraficos.appendChild(card);

        // 2. Instanciamos Chart.js leyendo la unidad y los puntos directamente del objeto
        const ctx = document.getElementById(`chart-dinamico-${idx}`);
        new Chart(ctx, {
            type: "scatter",
            data: {
                datasets: [{
                    label: `${analito.nombre} (${analito.unidad})`,
                    data: analito.puntosA,
                    backgroundColor: "rgb(37, 99, 235)",
                    pointRadius: 7,
                    pointHoverRadius: 9
                },
                {
                    label: `Muestra B (${analito.unidad})`,
                    data: analito.puntosB,
                    backgroundColor: "rgb(249, 115, 22)",
                    pointRadius: 7,
                    pointHoverRadius: 9
                }
            ]
            },
            options: {
                scales: {
                    x: {
                        title: { display: true, text: "N° de Laboratorio Participante" },
                        ticks: { stepSize: 1 },
                        min: 0,
                        max: 5
                    },
                    y: {
                        title: { display: true, text: analito.unidad },
                        beginAtZero: true
                    }
                }
            }
        });
    });
}

