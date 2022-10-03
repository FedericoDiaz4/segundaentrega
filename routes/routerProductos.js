import express from 'express';
import {productosDao} from '../daos/index.js'

const routerProductos = express.Router();
const admin = true;

routerProductos.use(express.json());
routerProductos.use(express.urlencoded( {extended: true} ));

const esAdmin = (req, res, next) => {
    if (admin) {
        next();
    } else {
        res.json({error: -1, descripcion: `Ruta: ${req.originalUrl} en metodo ${req.method} solo disponible para admin.`})
    }
}

routerProductos.get('/', async (req,res) => {
    res.json(await productosDao.getAll());
})

routerProductos.get('/:id', async (req,res) => {
    res.json(await productosDao.getById(req.params.id, false));
})

routerProductos.post('/', esAdmin, async (req,res) => {
    res.json(await productosDao.addData(req.body));
})

routerProductos.put('/:id', esAdmin, async (req, res) => {
    res.json(await productosDao.editData(req.params.id, req.body));
})

routerProductos.delete('/:id', esAdmin, async (req, res) => {
    res.json(await productosDao.deleteData(req.params.id));
});

export default routerProductos;