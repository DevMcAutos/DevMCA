const express = require("express");
const connectMongo = require("connect-mongo");
const adminRouter = require("../router/adminRouter");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const notFound = require("../middlewares/notFound")

const app = express();

app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));

const port = 8080;
const password = "WL8dejINXIZCPyeu"

mongoose.connect("mongodb+srv://devmcautomotores:WL8dejINXIZCPyeu@cluster0.a1uyqnf.mongodb.net/MCAutos")

app.use(notFound)

app.use(adminRouter);

app.listen(port, () => {
  console.log(`Servidor listo escuchando en el puerto ${port}`);
});
