const Cars = require("../daos/models/automoviles");
const mongoContainer = require("../daos/mongoContenedor");
const carController = new mongoContainer();

//Obtener autos con parametros
async function getCarsParams(req, res) {
  const { search, filters } = req.body;
  const cars = await carController.read(search, filters);
  if (cars.length === 0) {
    res.send("No hay resultados");
  } else {
    res.json(cars);
  }
}

//Obtener todos los autos
async function getCars(req, res) {
  const cars = await carController.read();
  res.status(200).json(cars);
}

//Registrar en BD un auto nuevo
async function newCarPost(req, res) {
  const newCar = req.body;
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
  const { id } = req.query;
  const deleteCar = await carController.delete(id);
  if (deleteCar) {
    res.status(200).json(deleteCar);
  } else {
    res.status(404).json({ msg: "Auto ${id} no encontrado" });
  }
}

//Actualizar un valor de algún auto
async function updateCarParam(req, res) {
  const { id } = req.query;
  const changes = req.body;
  const updateCar = await carController.update(id, changes);
  if (changes && updateCar) {
    res.status(201).json(updateCar);
  } else if (changes && !updateCar) {
    res.status(404).json({ msg: "Auto con id: ${id} no encontrado" });
  } else {
    res.status(400).json({ msg: "Erorr al modificar el auto con id: ${id}" });
  }
}

module.exports = {
  newCarPost,
  getCars,
  getCarsParams,
  updateCarParam,
  deleteCar,
};
