class ContenedorMemoria {
    constructor() {
        this.arrData = [];
    }

    getAll(){
        return this.arrData;
    }

    getById(id, carrito) {
        const item = this.arrData.find(d=>d.id == id);
        if (item == null) {
            if (carrito) return {error: "Error, carrito no encontrado"};
            return {error: 'Error, producto no encontrado.'};
        }
        if(carrito) return item.productos;
        return item;
    }

    addData(data) {
        let newId = 1;
        if (this.arrData.length != 0) {
            newId = this.arrData[this.arrData.length-1].id + 1;
        }
        this.arrData.push({id: newId, ...data});
        return {id: newId, ...data};
    }

    addDataToCart(idCart, prod) {
        const cart = this.getById(idCart);
        cart.productos.push(prod);
        this.editData(idCart, cart);
        return cart;
    }

    editData(id, data) {
        const index = this.arrData.findIndex(d => d.id == id);
        if (index == -1) {
            return {error: 'Error, producto a editar no encontrado'};
        }
        this.arrData[index] = {id:id, ...data};
        return {id: id, ...data};
    }

    deleteData(id) {
        const index = this.arrData.findIndex(d=> d.id == id);
        if (index == -1) {
            return {error: 'Error, producto a eliminar no encontrado'};
        }
        return this.arrData.splice(index,1);
    }

    deleteDataToCart(idCart, idProd) {
        const cart = this.getById(idCart);
        const index = cart.productos.findIndex(d => d.id == idProd);
        if (index == -1) {
            return {error: 'Error, producto a eliminar no encoentrado en el carrito'};
        }
        cart.productos.splice(index, 1);
        this.editData(idCart, cart);
        return cart;
    }

    deleteAll() {
        this.arrData = [];
    }

}

export default ContenedorMemoria;