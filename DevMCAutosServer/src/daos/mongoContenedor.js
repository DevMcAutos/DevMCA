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

    async update(id, changes){    
        try {
            const result = []
            const carUpdate = await this.route.findOneAndUpdate({_id: id}, changes);
            console.log(`Auto modificado:\n${carUpdate.brand} ${carUpdate.model}`);
            result.push(carUpdate)
            return result;
        } catch (error) {
            return []
        }
    }

    async delete(id){
        try {
            const result = []
            const car = await this.route.findOne({_id:id})
            result.push(car)
            const carDelete = await this.route.deleteOne({_id:id});      
            console.log(`Auto eliminado: ${car.brand} ${car.model}`);
            return result
        } catch (error) {
            return []
        } 
    };

    async read(search, filters){
        if(search === undefined && JSON.stringify(filters) === "{}"){
            //mostrar todos los autos
            const cars = await this.route.find();
            return cars;
        }else if(JSON.stringify(search) !== "{}" && search !== undefined){
            //filtrado por coincidencia de busqueda --- EJ: /getCars?search=toyota 
            const result = [];
            const cars = await this.route.find();
            cars.filter((c)=>{
                if(c.name.includes(search)){
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