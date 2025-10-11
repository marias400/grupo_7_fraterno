const express = require("express");
const methodOverride = require("method-override");
const path = require("path");
const session = require("express-session");
const sessionMiddleware = require("./middleware/sessionMiddleware");
const cors = require("cors");
const config = require("./config");

const routesHome = require("./routes/homeRoutes");
const routesAdmin = require("./routes/adminRoutes");
const routesUsers = require("./routes/usersRoutes");
const routesProducts = require("./routes/productsRoutes");
const routesCarts = require("./routes/cartRoutes");
const routesApi = require("./routes/api/routesApi");

const getPort = require('get-port').default;
const fs = require("fs");
const webhook = require("./hooks/webhook");
const app = express();

/* Configurar logging */
const logsDir = path.join(__dirname, "../logs");
const logPath = path.join(logsDir, "logs.txt");

// Crear carpeta logs si no existe
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
  console.log(`Carpeta de logs creada en: ${logsDir}`);
}

// Crear archivo logs.txt si no existe
if (!fs.existsSync(logPath)) {
  fs.writeFileSync(logPath, "");
  console.log(`Archivo logs.txt creado en: ${logPath}`);
}

console.log(`Guardando logs en: ${logPath}`);

// Función auxiliar para escribir logs
const writeLog = (message) => {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}\n`;
  
  fs.appendFile(logPath, logMessage, (err) => {
    if (err) console.error("Error al escribir en logs.txt:", err);
  });
};

// Middleware de logging para todas las peticiones
app.use((req, res, next) => {
  const logMessage = `${req.method} ${req.path} - IP: ${req.ip}`;
  writeLog(logMessage);
  next();
});

/* Middlewares */
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors(config));
app.use(session({
  name: "cookie",
  secret: "califragilistico",
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, httpOnly: true },
}));
app.use(sessionMiddleware);

/* Rutas */
app.use("/", routesHome);
app.use("/admin", routesAdmin);
app.use("/users", routesUsers);
app.use("/products", routesProducts);
app.use("/cart", routesCarts);
app.use("/api", routesApi);

/* View engine y carpeta pública */
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.resolve(path.join(__dirname, "../public"))));

/* Manejo de errores con logging */
app.use((err, req, res, next) => {
  const errorMessage = `ERROR: ${err.message} | URL: ${req.path} | Método: ${req.method}`;
  writeLog(errorMessage);
  console.error(errorMessage);
  res.status(500).json({ error: "Error del servidor" });
});

/* Levantar servidor en puerto disponible */
(async () => {
  const PORT = await getPort({ port: [8000, 8080, 8081, 8082] });
  app.listen(PORT, () => {
    const startMessage = `Server running on http://localhost:${PORT}`;
    console.log(startMessage);
    writeLog(startMessage);
  });
  
  // Iniciar webhook server
  webhook.startWebhook();
})();