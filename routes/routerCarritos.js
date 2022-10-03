import express from 'express';
import { carritosDao } from '../daos/index.js'
import { productosDao } from '../daos/index.js';

const routerCarritos = express.Router();
const admin = true;

routerCarritos.use(express.json());
routerCarritos.use(express.urlencoded( {extended: true} ));

routerCarritos.post('/', async (req,res) => {
    res.json(await carritosDao.addData({timestamp: new Date(), ...req.body}));
})

routerCarritos.delete('/:id', async (req,res) => {
    res.json(await carritosDao.deleteData(req.params.id));
})

routerCarritos.get('/:id/productos', async (req, res) => {
    res.json(await carritosDao.getById(req.params.id, true));
})

routerCarritos.post('/:id/productos', async (req, res) => {
    const producto = await productosDao.getById(req.body.idProducto);
    if (producto.error) {
        res.json({error: "Error, Producto a ingresar no encontrado."});
    } else {
        res.json(await carritosDao.addDataToCart(req.params.id, producto));
    }
})

routerCarritos.delete('/:id/productos/:id_prod', async (req,res) => {
    res.json(await carritosDao.deleteDataToCart(req.params.id, req.params.id_prod));
})

export default routerCarritos;