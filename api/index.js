require('dotenv').config();
const express = require("express");
const cors = require("cors");
const { WorkOS } = require("@workos-inc/node");

const app = express();
const PORT = process.env.PORT || 3001;

// Inicializar WorkOS
const workos = new WorkOS(process.env.WORKOS_API_KEY);

// Middleware para habilitar CORS
app.use(cors({
  origin: ['http://localhost:3039', 'https://material-kit-react-psi.vercel.app'],
  credentials: true
}));
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

// backend: /api/auth/signin
// app.get("/api/auth/signin", (req, res) => {
//   const redirectUri = "http://localhost:3039";

//   // Use workos.userManagement instead of workos.sso
//   const authUrl = workos.userManagement.getAuthorizationUrl({
//     provider: 'authkit', // Or your specific provider
//     redirectUri: redirectUri,
//     clientId: process.env.WORKOS_CLIENT_ID,
//   });

//   res.redirect(authUrl); 
// });

// --- RUTA DE LOGOUT SIGUIENDO LA DOC ---
app.get("/api/auth/logout", (req, res) => {
  const { sessionId } = req.query;

  if (!sessionId) {
    console.log("⚠️ No se recibió sessionId, redirigiendo a login local.");
    return res.redirect("http://localhost:3039/sign-in");
  }

  try {
    // IMPLEMENTACIÓN OFICIAL SEGÚN LA DOC QUE ME PASASTE
    const logoutUrl = workos.userManagement.getLogoutUrl({
      sessionId: sessionId,
      returnTo: 'http://localhost:3039/sign-in', 
    });

    res.redirect(logoutUrl);
  } catch (error) {
    console.error("❌ Error generando URL de logout:", error);
    res.redirect("http://localhost:3039/sign-in");
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
