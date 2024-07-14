const express = require("express");
const app = express();
const path = require("path");
const routesProducs = require("./routes/products");
const routesHome = require("./routes/home");
const routesUser = require("./routes/user");
const routesAdmin = require("./routes/admin");

/*PUERTO (esta vez no es el 80) :D */
let PORT = process.env.PORT || 8000;


const publicPath = path.resolve('./public');

app.use(express.static(publicPath));


/*view engine*/
app.set("view engine", "ejs");


/*rutas de paginas*/
app.use("/", routesHome);
app.use("/", routesProducs);
app.use("/", routesUser);
app.use("/", routesAdmin);


/*iniciador del server + error*/
app.listen(PORT, (err) => {
    err
    ? console.error("Server failed. ", err.message)
    : console.log(`Server running on http://localhost:${PORT}`);
});