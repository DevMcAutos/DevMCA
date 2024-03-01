const express = require("express");
const connectMongo = require("connect-mongo");
const adminRouter = require("../router/adminRouter");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const notFound = require("../middlewares/notFound")
const cors = require('cors');
const errorHandler = require("../middlewares/errorHandler")
const path = require('path');
const app = express();

const port = 8080;

app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));
//app.use(notFound)
app.use(cors());
app.use(errorHandler)
app.use(adminRouter);
app.use('/img', express.static(path.join(__dirname, 'img')));

// Ruta para mostrar una imagen específica
app.get('/imagen/:auto/:nombreImagen', (req, res) => {
    const nombreImagen = req.params.nombreImagen;
    const auto = req.params.auto
    res.sendFile(path.join(__dirname, `../img/${auto}`, nombreImagen));
});



mongoose.connect(process.env.MONGO_DB)



app.listen(port, () => {
  console.log(`Servidor listo escuchando en el puerto ${port}`);
});


module.export = app