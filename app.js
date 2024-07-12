const express = require("express");
const app = express();
const path = require("path");

let port = process.env.PORT || 8000;

const publicPath = path.resolve('./public');
app.use(express.static(publicPath));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render('home');
});

app.get("/producto", (req, res) => {
    res.render('products/product-detail');
});

app.get("/carrito", (req, res) => {
    res.render('products/product-cart');
});

app.get("/ingresar", (req, res) => {
    res.render('users/log-in');
});

app.get("/registrar", (req, res) => {
    res.render('users/register');
});

app.listen(port, () => {
    console.log(`online en ${port}`);
});