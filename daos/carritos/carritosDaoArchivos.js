import ContenedorArchivo from "../../contenedores/ContenedorArchivo.js";

class CarritosDaoArchivo extends ContenedorArchivo {
    constructor() {
        super(process.cwd() + '/db/carritos.json');
    }
}

export default CarritosDaoArchivo;