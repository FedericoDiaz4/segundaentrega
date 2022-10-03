import ContenedorArchivo from "../../contenedores/ContenedorArchivo.js";

class ProductosDaoArchivo extends ContenedorArchivo {
    constructor() {
        super(process.cwd() + '/db/productos.json');
    }
}

export default ProductosDaoArchivo;