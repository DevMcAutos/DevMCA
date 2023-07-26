const { newCarPost } = require("../service/add");

const newCarPostMiddleware = (req, res, next) => {
  if (!req.body.modelo == String) {
    return res.status(403).json({ error: "El modelo debe ser alfanumérico" });
  }
  next();
};

module.exports = {
  newCarPostMiddleware,
};
