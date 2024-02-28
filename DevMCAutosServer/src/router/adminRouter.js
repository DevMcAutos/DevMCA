const { Router } = require("express");
const compression = require("express");
const multer = require('multer')
const session = require('express-session')
const passport = require('passport')
const cookieParser = require('cookie-parser')
const { put } = require("@vercel/blob")
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, './src/img/'); // Directorio donde se guardarán los archivos
  },
  filename: (req, file, cb) => {
      cb(null, file.originalname); // Mantener el nombre original del archivo
  },
});
const upload = multer({storage:storage})

const adminRouter = new Router();


// Ruta para la verificación del admin

adminRouter.use(session({
  secret:"secreto",
  cookie:{
    httpOnly:false,
    secure:false,
    maxAge: 600 * 1000,
  },
  resave:true,
  saveUninitialized:true
}))
adminRouter.use(passport.initialize())
adminRouter.use(passport.session())
// Imports
const { loginPost } = require("../service/auth");
const {
  getCars,
  newCarPost,
  deleteCar,
  updateCarParam,
  getCarsById,
  uploadImage
} = require("../service/add");
const { newCarPostMiddleware, uploadImages} = require("../middlewares/middleware");
const {} = require("../service/hash");

adminRouter.use(compression());
//GET
adminRouter.get("/getCars", getCars);
adminRouter.get("/getCars/:id", getCarsById);

//POST
adminRouter.post("/newCar", newCarPost);
adminRouter.post("/login", loginPost, (req,res)=>{
  const flag = req.isAuthenticated()
  res.send({logged:flag})
});
adminRouter.post("/imagen", upload.any(), uploadImage)
adminRouter.get("/logged", (req,res)=>{
  console.log(req.isAuthenticated());
})
//DELETE
adminRouter.delete("/deleteCar/:id",deleteCar);
//UPDATE
adminRouter.put("/updateCar/:id", updateCarParam);

module.exports = adminRouter;
