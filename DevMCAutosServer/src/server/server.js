const express = require("express");
const connectMongo = require("connect-mongo");
const adminRouter = require("../router/adminRouter");

const server = express();

const port = 8080;

const password = "WL8dejINXIZCPyeu"

const MongoStore = connectMongo.create({
  mongoUrl: `mongodb+srv://devmcautomotores:${password}@cluster0.a1uyqnf.mongodb.net/MCAutos`,
  ttl: 600,
});

server.use(adminRouter);

server.listen(port, () => {
  console.log(`Servidor listo escuchando en el puerto ${port}`);
});
