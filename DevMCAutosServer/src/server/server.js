const express = require("express");
const connectMongo = require("connect-mongo");
const adminRouter = require("../router/adminRouter");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const notFound = require("../middlewares/notFound")
const cors = require('cors');
const errorHandler = require("../middlewares/errorHandler")

const app = express();

const port = 8080;
const password = "WL8dejINXIZCPyeu"

app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));
//app.use(notFound)
app.use(cors());
app.use(errorHandler)
app.use(adminRouter);




mongoose.connect("mongodb+srv://devmcautomotores:WL8dejINXIZCPyeu@cluster0.a1uyqnf.mongodb.net/MCAutos")



app.listen(port, () => {
  console.log(`Servidor listo escuchando en el puerto ${port}`);
});
