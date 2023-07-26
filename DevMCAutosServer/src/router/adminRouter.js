const { Router } = require("express");
const compression = require("express");

// Imports
const { loginPost } = require("../service/auth");
const {
  getCars,
  getCarsParams,
  newCarPost,
  deleteCar,
  updateCarParam,
} = require("../service/add");
const { newCarPostMiddleware } = require("../middlewares/middleware");
const {} = require("../service/hash");

const adminRouter = new Router();
adminRouter.use(compression());

//GET
adminRouter.get("/getCars", getCars);
adminRouter.get("/getCarsParams", getCarsParams);

//POST
adminRouter.post("/newCar", newCarPostMiddleware, newCarPost);
adminRouter.post("/login", loginPost);

//DELETE
adminRouter.delete("/deleteCar", deleteCar);

//UPDATE
adminRouter.put("/updateCar", updateCarParam);

module.exports = adminRouter;
