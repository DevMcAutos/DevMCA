const { Router } = require("express")
const carRouter = Router();
const mongoContainer = require("../daos/mongoContenedor");
const carController = new(mongoContainer);

carRouter.get("", async (req,res)=>{
    const {search, filters} = req.body;
    const cars = await carController.read(search,filters);
    if(cars === 0){
        res.send("No hay resultados");
    }else{
        res.json(cars);
    };
});

module.exports = carRouter;