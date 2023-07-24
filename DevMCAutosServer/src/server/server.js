const express = require("express");
const connectMongo = require("connect-mongo");

const MongoStore = connectMongo.create({
  mongoUrl:
    "mongodb+srv://devmcautomotores:<password>@cluster0.a1uyqnf.mongodb.net/MCAutos",
  ttl: 600,
});
