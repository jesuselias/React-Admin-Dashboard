const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware para habilitar CORS
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Datos de prueba
const appleStockData = [
  { date: "2025-01-10", price: 182.45 }, 
  { date: "2025-02-10", price: 185.12 },
  { date: "2025-03-10", price: 154.00 },
  { date: "2025-04-10", price: 156.20 },
  { date: "2025-05-10", price: 158.40 },
  { date: "2025-06-10", price: 160.75 },
  { date: "2025-07-10", price: 162.50 },
  { date: "2025-08-10", price: 165.80 },
  { date: "2025-09-10", price: 168.15 },
  { date: "2025-10-10", price: 170.25 },
  { date: "2025-11-10", price: 174.30 },
  { date: "2025-12-10", price: 178.90 },
];

// Ruta de la API
app.get("/api/stocks", (req, res) => {
  res.json(appleStockData);
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
