const { newCarPost } = require("../service/add");
const multer = require('multer')


const newCarPostMiddleware = (req, res, next) => {
  if (!req.body.modelo == String) {
    return res.status(403).json({ error: "El modelo debe ser alfanumérico" });
  }
  next();
};

const uploadImages = (req,res,next)=>{
  const { brand, model, year} =
  req.body;
    const upload = multer({dest: `img/${brand}-${model}-${year}/`})
  upload.any() 
  res.send("joya")
}

module.exports = {
  newCarPostMiddleware,
  uploadImages
};
