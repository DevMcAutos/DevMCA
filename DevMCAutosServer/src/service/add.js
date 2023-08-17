const Cars = require("../daos/models/automoviles");
const mongoContainer = require("../daos/mongoContenedor");
const carController = new mongoContainer(Cars);

//Obtener autos con parametros
async function getCars(req, res) {
  const search= req.query.search;
  const filters = req.body;
  const cars = await carController.read(search, filters);
  if (cars.length === 0) {
    res.json({msg:"No hay resultados"});
  } else {
    res.json(cars);
  }
}

//Registrar en BD un auto nuevo
async function newCarPost(req, res) {
  const {body} = req;
  const newCar = body;
  await carController.create(newCar);
  const { brand, model, year, kms, engine, version, fuel, traction, price } =
    req.body;
  if ((brand, model, year, kms, engine, version, fuel, traction, price)) {
    res.status(201).json(newCar);
  } else {
    res.status(400).json({ msg: "Error al subir el auto" });
  }
}

//Borrar de la BD un auto
async function deleteCar(req, res) {
  const id = req.params.id;
  const deleteCar = await carController.delete(id);
  if (deleteCar.length === 1) {
    res.status(200).json({msg: `${deleteCar[0].brand} ${deleteCar[0].model} eliminado`});
  } else {
    res.status(404).json({ msg: `Auto ${id} no encontrado` });
  }
}

//Actualizar un valor de algún auto
async function updateCarParam(req, res) {
  const id = req.params.id;
  const changes = req.body;
  const updateCar = await carController.update(id, changes);
  
  if (JSON.stringify(changes) !== "{}" && updateCar.length > 0) {
    res.status(201).json({msg:`Auto con id: ${id} modificado`});
  } else if (JSON.stringify(changes) !== "{}" && updateCar.length === 0) {
    res.status(404).json({ msg: `Auto con id: ${id} no encontrado` });
  } else {
    res.status(400).json({ msg: `Erorr al modificar el auto con id: ${id}` });
  }
}

async function getCarsById(req,res){
  const id = req.params.id;
  const filters = {_id:id}
  const car = await carController.read({}, filters);
  res.json(car[0])
}

module.exports = {
  newCarPost,
  getCars,
  updateCarParam,
  deleteCar,
  getCarsById
};
