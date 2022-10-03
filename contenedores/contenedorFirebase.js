import admin from 'firebase-admin';
import configFirebase from '../config/configFirebase.js'

admin.initializeApp({
  credential: admin.credential.cert(configFirebase)
});

const err = {error: "Error al conectar a la base de datos."};
const db = admin.firestore();

class ContenedorFirebase {
    constructor(collection){
        this.query = db.collection(collection);
    }

    async getAll() {
        try {
            const snapshot = await this.query.get();
            let docs = snapshot.docs;
            return docs.map((doc)=>({
                id: doc.id,
                data: doc.data()
            }));
        } catch (error) {
            console.log(error);
            return err;
        }
    }

    async getById(id, carrito) {
        try {
            const doc = this.query.doc(`${id}`);
            const item = await doc.get();
            if(carrito) return item.data().productos;
            return {id, ...item.data()};
        } catch (error) {
            console.log(error);
            return err;
        }
    }

    async addData(data){
        try {
            const doc = this.query.doc();
            await doc.create(data);
            return {done: 'Produto agregado correctamente'};  
        } catch (error) {
            console.log(error);
            return err;
        }
    }

    async addDataToCart(idCart,prod) {
        try {
            const cart = await this.getById(idCart);
            cart.productos.push(prod);
            await this.editData(idCart, cart);
            return cart
        } catch (error) {
            console.log(error);
            return err;
        }
    }

    async editData(id, data) {
        try {
            const doc = this.query.doc(`${id}`);
            let item = await doc.update(data);
            return item    
        } catch (error) {
            console.log(error);
            return err;
        }
    }

    async deleteData(id) {
        try {
            const doc = this.query.doc(`${id}`);
            await doc.delete();
            return {done: `Producto ${id} eliminado satisfactoriamente.`};    
        } catch (error) {
            console.log(error);
            return err;
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
}

export default ContenedorFirebase