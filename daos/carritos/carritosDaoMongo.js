import ContenedorMongo from "../../contenedores/ContenedorMongo.js";
import {carritosCollection, carritosSchema } from '../../models/carritos.js';

class CarritosDaoMongo extends ContenedorMongo {
    constructor(){
        super(carritosCollection, carritosSchema);
    }
}

export default CarritosDaoMongo;