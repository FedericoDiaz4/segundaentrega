import 'dotenv/config';

let productosDao;
let carritosDao;
let bd = process.env.DATABASE
console.log(bd);
switch(bd) {
    case "memoria":
        const { default: productosDaoMemoria } = await import('./productos/productosDaoMemoria.js');
        const { default: carritosDaoMemoria } = await import('./carritos/carritosDaoMemoria.js');
        productosDao = new productosDaoMemoria();
        carritosDao = new carritosDaoMemoria();
        break;
    case "mongodb":
        const { default: productosDaoMongo } = await import('./productos/productosDaoMongo.js');
        const { default: carritosDaoMongo } = await import('./carritos/carritosDaoMongo.js');
        productosDao = new productosDaoMongo();
        carritosDao = new carritosDaoMongo();
        break;
    case "archivo":
        const { default: productosDaoArchivos } = await import ('./productos/productosDaoArchivos.js');
        const { default: carritosDaoArchivos } = await import('./carritos/carritosDaoArchivos.js');
        productosDao = new productosDaoArchivos();
        carritosDao = new carritosDaoArchivos();
        break;
    case "firebase":
        const { default: ProductosDaoFirebase } = await import ('./productos/productosDaoFirebase.js');
        const { default: carritosDaoFirebase } = await import('./carritos/carritosDaoFirebase.js');
        productosDao = new ProductosDaoFirebase();
        carritosDao = new carritosDaoFirebase();
        break;
    case "bd":
        const { default: ProductosDaoDb } = await import ('./productos/productosDaoDB.js');
        const { default: CarritosDaoDb } = await import('./carritos/carritosDaoDB.js');
        productosDao = new ProductosDaoDb();
        carritosDao = new CarritosDaoDb();
        break;
    default: 
        productosDao = null;
        carritosDao = null;
}

export { productosDao, carritosDao } ;