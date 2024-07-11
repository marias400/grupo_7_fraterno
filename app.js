const express = require("express");
const app = express();
const path = require("path");

let port = process.env.PORT || 8000;

const publicPath = path.resolve('./public');
app.use(express.static(publicPath));

app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./views/home.html"));
});

app.get("/producto", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./views/products/productDetail.html"));
});

app.get("/carrito", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./views/products/productCart.html"));
});

app.get("/ingresar", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./views/users/log_in.html"));
});

app.get("/registrar", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./views/users/register.html"));
});

app.listen(port, () => {
    console.log(`online en ${port}`);
});