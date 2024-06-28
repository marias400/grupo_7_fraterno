const express = require("express");
const app = express();
const path = require("path");

let port = process.env.PORT || 80;

const publicPath = path.resolve('./public');
app.use(express.static(publicPath));

app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./views/productDetail.html"));
});

app.listen(port, () => {
    console.log(`online en ${port}`);
});