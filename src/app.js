const express = require("express");
const methodOverride = require("method-override");
const app = express();
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

/*PUERTO (esta vez no es el 80 :D) */
let PORT = process.env.PORT || 8000;

/*carpeta estática de imágenes y hojas de estilo*/
const publicPath = path.resolve(path.join(__dirname, "../public"));
app.use(express.static(publicPath));

const sessionConfig = {
  name: "cookie",
  secret: "califragilistico",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true,
  },
};

// cors
app.use(cors(config));

/*middlewares*/
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session(sessionConfig));
app.use(sessionMiddleware);

/*view engine*/
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

/*rutas de paginas*/
app.use("/", routesHome);
app.use("/admin", routesAdmin);
app.use("/users", routesUsers);
app.use("/products", routesProducts);
app.use("/cart", routesCarts);
app.use("/api", routesApi);

/*iniciador del server + error*/
app.listen(PORT, (err) => {
  err
    ? console.error("Server failed. ", err.message)
    : console.log(`Server running on http://localhost:${PORT}`);
});
