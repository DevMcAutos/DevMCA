const express = require("express");
const connectMongo = require("connect-mongo");
const adminRouter = require("../router/adminRouter");
const bodyparser = require("body-parser");

const server = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyparser.urlencoded({ extended: true }));

const port = 8080;

const MongoStore = connectMongo.create({
  mongoUrl: `mongodb+srv://devmcautomotores:${password}@cluster0.a1uyqnf.mongodb.net/MCAutos`,
  ttl: 600,
});

server.use(adminRouter);

server.listen(port, () => {
  console.log(`Servidor listo escuchando en el puerto ${port}`);
});
