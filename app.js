const express = require("express");
const app = express();
const path = require("path");

let port = process.env.PORT || 80;

const publicPath = path.resolve('./public');
app.use(express.static(publicPath));

app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./views/home.html"));
});

app.get("/views/productDetail.html", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./views/productDetail.html"));
});

app.get("/views/log_in.html", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./views/log_in.html"));
});

app.get("/views/productCart.html", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./views/productCart.html"));
});

app.get("/views/register.html", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./views/register.html"));
});

app.listen(port, () => {
    console.log(`online en ${port}`);
});