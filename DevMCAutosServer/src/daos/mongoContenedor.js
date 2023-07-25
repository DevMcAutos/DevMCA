const { v4: uuidv4 } = require("uuid")

class mongoContainer{
    constructor(route){
        this.route = route;
    }

    async create(newCar){
        const car = new this.route(newCar);
        car.id = uuidv4();
        await car.save();
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
        if(!search && !filters){
            //mostrar todos los autos
            const cars = await this.find();
            return cars;
        }else if(search){
            //filtrado por coincidencia de busqueda
            const result = [];
            const cars = await this.find();
            cars.filter(search)((c)=>{
                if(
                    c.model.includes(search)||
                    c.brand.includes(search)||
                    c.traction.includes(search)||
                    c.year.includes(search)
                ){
                    result.push(c);
                };
            });
            return result;
        }else if(filters){
            //filtrar por checkbox
        };
    };
};

module.exports = mongoContainer;