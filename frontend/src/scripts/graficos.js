const datosSimulados = [
  { laboratorio: "Lab Alpha",   ph: 7.1, plomo: 0.004 },
  { laboratorio: "Lab Beta",    ph: 7.4, plomo: 0.009 },
  { laboratorio: "Lab Gamma",   ph: 6.8, plomo: 0.002 },
  { laboratorio: "Lab Delta",   ph: 7.9, plomo: 0.015 },
  { laboratorio: "Lab Épsilon", ph: 7.2, plomo: 0.006 }
];

datosSimulados.sort((a, b) => a.ph - b.ph);

// 2. Separamos los datos para el Gráfico de Barras
const nombresLabs = datosSimulados.map(item => item.laboratorio);
const valoresPh = datosSimulados.map(item => item.ph);

const ctxBarras = document.getElementById("grafico-barras");

new Chart(ctxBarras, {
  type: "bar",
  data: {
    labels: nombresLabs,
    datasets: [{
      label: "Valor de pH reportado",
      data: valoresPh,
      backgroundColor: "rgba(37, 99, 235, 0.7)",
      borderColor: "rgb(37, 99, 235)",
      borderWidth: 1,
      borderRadius: 6
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: false,
        min: 5,
        max: 10
      }
    }
  }
});

// 3. Transformamos los datos a coordenadas {x, y} para el Gráfico de Puntos
const puntosPlomo = datosSimulados.map((item, index) => ({
  x: index + 1,
  y: item.plomo
}));

const ctxPuntos = document.getElementById("grafico-puntos");

new Chart(ctxPuntos, {
  type: "scatter",
  data: {
    datasets: [{
      label: "Concentración de Plomo (mg/L)",
      data: puntosPlomo,
      backgroundColor: "rgb(220, 38, 38)",
      pointRadius: 7,
      pointHoverRadius: 9
    }]
  },
  options: {
    scales: {
      x: {
        title: { display: true, text: "N° de Laboratorio Participante" },
        ticks: { stepSize: 1 }
      },
      y: {
        title: { display: true, text: "mg/L" },
        beginAtZero: true
      }
    }
  }
});