import mongoose from "mongoose";

export const productosCollection = 'productos';

export const productosSchema = new mongoose.Schema({
    nombre: {type: String, required: true},
    descripcion: {type: String, required: true},
    codigo: {type: String, required: true},
    url: {type: String, required: true},
    precio: {type: Number, required: true},
    stock: {type: Number, required: true},
});