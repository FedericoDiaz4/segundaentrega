import ContenedorMongo from "../../contenedores/ContenedorMongo.js";
import { productosCollection, productosSchema } from '../../models/productos.js';

class ProductosDaoMongo extends ContenedorMongo {
    constructor(){
        super(productosCollection, productosSchema);
    }
}

export default ProductosDaoMongo;