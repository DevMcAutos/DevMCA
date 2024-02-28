const Cars = require("../daos/models/automoviles");
const mongoContainer = require("../daos/mongoContenedor");
const carController = new mongoContainer(Cars);
const multer = require('multer')
const fs = require('fs');
const {put} = require("@vercel/blob")
//Obtener autos con parametros
async function getCars(req, res) {
  const search= req.query.search
  const filters = req.body;
  const cars = await carController.read(search, filters);
  if (cars.length === 0) {
    res.json(cars);
  } else {
    res.json(cars);
  }
}

//Registrar en BD un auto nuevo
async function newCarPost(req, res) {
  const {body} = req;
  const newCar = body;
  const { brand, model, year, kms, engine, version, fuel, traction, price, image, detalle} =
    req.body;
  newCar.name = `${brand} ${model} ${version} ${year}`
  newCar.image = []
  const move = multer({dest:`./src/img/${brand.replace(/ /g, "-")}-${model.replace(/ /g, "-")}-${version.replace(/ /g, "-")}-${year.replace(/ /g, "-")}-${detalle?.replace(/ /g, "-")}`})
      await fs.readdir(`./src/img/`, (error, archivos) => {
        archivos.forEach((archivo) => {
          const rutaCompleta = `./src/img/${archivo}`;
        fs.stat(rutaCompleta, (error, stats) => {
            if (stats.isDirectory()) {
            } else {
                newCar.image.push(`http://localhost:8080/imagen/${brand.replace(/ /g, "-")}-${model.replace(/ /g, "-")}-${version.replace(/ /g, "-")}-${year.replace(/ /g, "-")}-${detalle.replace(/ /g, "-")}/${archivo}`)
                newCar.image.sort(function (a, b) {
                  return a - b;
                });
                const oldPath = rutaCompleta
                const newPath = `./src/img/${brand.replace(/ /g, "-")}-${model.replace(/ /g, "-")}-${version.replace(/ /g, "-")}-${year.replace(/ /g, "-")}-${detalle.replace(/ /g, "-")}/${archivo}`
                  fs.rename(oldPath, newPath, function (err) {
                    if (err) throw err
                  })
                
            }
        });
    });
});
  setTimeout(() => {
    carController.create(newCar);
  }, 2500);
  
  if ((brand, model, year, kms, engine, version, fuel, traction, price, image)) {
    res.status(201).json(newCar);
  } else {
    res.status(400).json({ msg: "Error al subir el auto" });
  }
}

//Borrar de la BD un auto
async function deleteCar(req, res) {
  const id = req.params.id;
  filters = {_id:id}
  const car = await carController.read({}, filters)
  if(car[0].detalle === undefined){
    car[0].detalle = ""
  }
  const ruta = `./src/img/${(car[0].brand).replace(/ /g, "-")}-${(car[0].model).replace(/ /g, "-")}-${(car[0].version).replace(/ /g, "-")}-${car[0].year}-${(car[0]?.detalle)?.replace(/ /g, "-")}`
  console.log(ruta);
  fs.rmdir(ruta, { recursive: true }, (err)=>{});
  const deleteCar = await carController.delete(id);
  if (deleteCar.length === 1) {
    res.status(200).json({msg: `${deleteCar[0].brand} ${deleteCar[0].model} eliminado`});
  } else {
    res.status(404).json({ msg: `Auto ${id} no encontrado` });
  }
}

async function uploadImage(req,res) {
  const { url } = await put('articles/blob.txt', 'Hello World!', { access: 'public' });
  res.send(url)
}

//Actualizar un valor de algún auto
async function updateCarParam(req, res) {
  const id = req.params.id;
  const changes = req.body;
  const filters = {_id:id}
  const car = await carController.read({}, filters);
  if (changes.brand==="") {
    changes.brand = car[0].brand
  }
  if (changes.model === "") {
    changes.model = car[0].model
  }
  if (changes.year === ""){
    changes.year = car[0].year
  }
  if (changes.kms ===""){
    changes.kms = car[0].kms
  }
  if(changes.engine === ""){
    changes.engine = car[0].engine
  }
  if (changes.version === "") {
    changes.version = car[0].version
  }
  if (changes.fuel === "") {
    changes.fuel = car[0].fuel
  }
  if (changes.traction === "") {
    changes.traction = car[0].traction
  }
  if (changes.price === "") {
    changes.price = car[0].price
  }
  changes.name = `${changes.brand} ${changes.model} ${changes.version} ${changes.year}`
  console.log(changes);
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
  getCarsById,
  uploadImage
};
