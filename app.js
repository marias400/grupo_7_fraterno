const express = require("express");
const methodOverride = require("method-override");
const app = express();
const path = require("path");
const session = require("express-session");
const sessionMiddleware = require("./middleware/sessionMiddleware");
const rememberUserMiddleware = require("./middleware/rememberUserMiddleware");

const routesHome = require("./routes/homeRoutes");
const routesAdmin = require("./routes/adminRoutes");
const routesUsers = require("./routes/usersRoutes");
const routesProducts = require("./routes/productsRoutes");

/*PUERTO (esta vez no es el 80 :D) */
let PORT = process.env.PORT || 8000;

/*carpeta estática de imágenes y hojas de estilo*/
const publicPath = path.resolve("./public");
app.use(express.static(publicPath));
/*middlewares*/
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  session({
    secret: "frase secreta",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(sessionMiddleware);
app.use(rememberUserMiddleware);

/*view engine*/
app.set("view engine", "ejs");

/*rutas de paginas*/
app.use("/", routesHome);
app.use("/admin", routesAdmin);
app.use("/users", routesUsers);
app.use("/products", routesProducts);

/*iniciador del server + error*/
app.listen(PORT, (err) => {
  err
    ? console.error("Server failed. ", err.message)
    : console.log(`Server running on http://localhost:${PORT}`);
});
