const express = require("express");
const app = express();
const path = require("path");

let PORT = process.env.PORT || 8000;

const publicPath = path.resolve('./public');
app.use(express.static(publicPath));

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));

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

app.get("/admin", (req, res) => {
    res.render('admin/products-editor');
});

app.listen(PORT, (err) => {
    err
    ? console.error("Server failed. ", err.message)
    : console.log(`Server running on http://localhost:${PORT}`);
});