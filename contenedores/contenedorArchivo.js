import { promises } from 'fs';

const err = {error: 'Error al leer el archivo'};

class ContenedorArchivo {
    constructor(ruta){
        this.ruta = ruta;
    }

    async getAll(){
        try {
            const data = await promises.readFile(this.ruta, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            return JSON.parse(err);
        }
    }

    async getById(id, carrito) {
        try {
            const data = await this.getAll();
            const item = data.find(a=> a.id == id);
            if (item == null) {
                if (carrito) return {error: 'Error, carrito no encontrado'};
                return {error: 'Error, producto no encontrado'};
            }
            if (carrito) return item.productos;
            return item;
        } catch (error) {
            return JSON.parse(err);
        }
    }

    async addData(data) {
        try {
            const arrData = await this.getAll();
            let newId = 1;
            if (arrData.length != 0) {
                newId = arrData[arrData.length-1].id + 1;
            }
            arrData.push({id: newId, ...data});
            await promises.writeFile(this.ruta, JSON.stringify(arrData));
            return {id: newId, ...data};
        } catch (error) {
            return JSON.parse(err);
        }
    }

    async addDataToCart(idCart, prod){
        try {
            const cart = await this.getById(idCart);
            cart.productos.push(prod);
            await this.editData(idCart, cart);
            return cart;
        } catch (error) {
            return JSON.parse(err);
        }
    }

    async editData(id, data) {
        try {
            const arrData = await this.getAll();
            const index = arrData.findIndex(d=>d.id == id);
            if (index == -1) {
                return {error: 'Error, producto a editar no encontrado'};
            }
            arrData[index] = {id: id, ...data};
            await promises.writeFile(this.ruta, JSON.stringify(arrData));
            return data;
        } catch (error) {
            return JSON.parse(err);
        }
    }

    async deleteData(id) {
        try {
            const arrData = await this.getAll();
            const index = arrData.findIndex(d=> d.id == id);
            if (index == -1) {
                return {error: 'Error, producto a eliminar no encoentrado'};
            }
            arrData.splice(index , 1);
            await promises.writeFile(this.ruta, JSON.stringify(arrData));   
            return arrData;
        } catch (error) {
            return JSON.parse(err);
        }
    }

    async deleteDataToCart(idCart, idProd) {
        const cart = await this.getById(idCart);
        const index = cart.productos.findIndex(d=> d.id == idProd);
        if (index == -1) {
            return {error: 'Error, producto a eliminar no encoentrado en el carrito'};
        }
        cart.productos.splice(index, 1);
        await this.editData(idCart, cart);
        return cart;
    }

    async deleteAll() {
        try {
            await promises.writeFile(this.ruta, '[]');
        } catch (error) {
            return JSON.parse(err);
        }
    }
}

export default ContenedorArchivo;