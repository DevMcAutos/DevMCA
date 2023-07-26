const { hashVerification } = require("./hash");
const { Strategy } = require("passport-local");
const passport = require("passport");

const LocalStrategy = Strategy;

// Verificación del admin

const user = {
  username: "admin",
  pass: "admin123",
};

passport.use(
  new LocalStrategy(async (username, password, done) => {
    if (!(await hashVerification(user.pass, password))) {
      console.log("Contraseña invalida");
      return done(null, false);
    }

    return done(null, false);
  })
);

passport.serializeUser((usuario, done) => {
  done(null, usuario);
});

passport.deserializeUser(async (nombre, done) => {
  const usuario = usuario.username == nombre;
  done(null, usuario);
});

// Ruta para la verificación del admin

let loginPost = passport.authenticate("local");

module.exports = {
  loginPost,
};
