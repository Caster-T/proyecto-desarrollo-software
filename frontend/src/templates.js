export const PLANTILLAS_FORMULARIOS = {
  fisicoquimico: {
    id: "fisicoquimico",
    nombre: "Análisis Físico-Químico de Agua",
    campos: [
      { id: "ph", label: "pH (25°C)", tipo: "number", min: 0, max: 14, step: "0.1", unidad: "pH" },
      { id: "turbidez", label: "Turbidez", tipo: "number", min: 0, step: "0.01", unidad: "NTU" },
      { id: "conductividad", label: "Conductividad", tipo: "number", min: 0, step: "1", unidad: "µS/cm" }
    ]
  },
  metales: {
    id: "metales",
    nombre: "Determinación de Metales Pesados",
    campos: [
      { id: "plomo", label: "Plomo (Pb)", tipo: "number", min: 0, step: "0.001", unidad: "mg/L" },
      { id: "arsénico", label: "Arsénico (As)", tipo: "number", min: 0, step: "0.001", unidad: "mg/L" },
      { id: "cadmio", label: "Cadmio (Cd)", tipo: "number", min: 0, step: "0.001", unidad: "mg/L" }
    ]
  },
  microbiologico: {
    id: "microbiologico",
    nombre: "Análisis Microbiológico",
    campos: [
      { id: "coliformes_totales", label: "Coliformes Totales", tipo: "text", placeholder: "Ausencia / Presente" },
      { id: "escherichia_coli", label: "Escherichia coli", tipo: "text", placeholder: "Ausencia / Presente" },
      { id: "bacterias_aerobias", label: "Recuento de Aerobias", tipo: "number", min: 0, unidad: "UFC/mL" }
    ]
  }
};