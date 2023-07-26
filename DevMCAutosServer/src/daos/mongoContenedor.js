const { v4: uuidv4 } = require("uuid")

class mongoContainer{
    constructor(route){
        this.route = route;
    }

    async create(newCar){
        const car = new this.route(newCar);
        await car.save()
        console.log(`Auto guardado:\n${car}`);
    };

    async update(query, change){
        const que = {};
        que._id = query;
        const carUpdate = await this.route.findOneAndUpdate(que, change);
        console.log(`Auto modificado:\n${carUpdate}`);
    }

    async delete(query){
        const que = {};
        que._id = query;
        const carDelete = await this.route(deleteOne)(que);
        console.log(`Auto eliminado:\n${carDelete}`);
    };

    async read(search, filters){
        if(search === undefined&& JSON.stringify(filters) === "{}"){
            //mostrar todos los autos
            const cars = await this.route.find();
            return cars;
        }else if(JSON.stringify(search) !== "{}" && search !== undefined){
            //filtrado por coincidencia de busqueda --- EJ: /getCars?search=toyota
            
            const result = [];
            const cars = await this.route.find();
            cars.filter((c)=>{
                if(
                    c.model.includes(search)||
                    c.brand.includes(search)||
                    c.traction.includes(search)
                ){
                    result.push(c);
                };
            });
            return result;
        }else if(JSON.stringify(filters) !== "{}"){
            //filtrar por checkbox -- EJ: brand:peugeot
            const cars = this.route.find(filters)
            return cars
        };
    };
};

module.exports = mongoContainer;