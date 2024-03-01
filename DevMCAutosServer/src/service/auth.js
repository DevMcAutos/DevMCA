const { hashVerification } = require("./hash");
const { Strategy } = require("passport-local");
const passport = require("passport");

const session = require('express-session')

const LocalStrategy = Strategy;

// Verificación del admin

const user = {
  username: "admin",
  pass: process.env.PASSWORD,
};

passport.use(
  new LocalStrategy(async (username, password, done) => {
    if (username !== user.username) {
      console.log("Nombre de usuario incorrecto");
      return done(null, false);
    }

    if (!(password === user.pass)) {
      console.log("Contraseña invalida");
      return done(null, false);
    }
    return done(null, user);
  })
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (name, done) => {
  const usuario = name
  done(null, usuario);
});

// Ruta para la verificación del admin

let loginPost = passport.authenticate("local");
  
module.exports = {
  loginPost,
};