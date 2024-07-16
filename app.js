const express = require("express");
const app = express();
const path = require("path");

const routesProducts = require("./routes/productsRoutes");
const routesHome = require("./routes/homeRoutes");
const routesUsers = require("./routes/usersRoutes");


/*PUERTO (esta vez no es el 80 :D) */
let PORT = process.env.PORT || 8000;


/*carpeta estática de imágenes y hojas de estilo*/
const publicPath = path.resolve('./public');
app.use(express.static(publicPath));


/*view engine*/
app.set("view engine", "ejs");


/*rutas de paginas*/
app.use("/", routesHome);
app.use("/products", routesProducts);
app.use("/users", routesUsers);


/*iniciador del server + error*/
app.listen(PORT, (err) => {
    err
    ? console.error("Server failed. ", err.message)
    : console.log(`Server running on http://localhost:${PORT}`);
});