import mongoose from "mongoose";

export const carritosCollection = 'carritos';

export const carritosSchema = new mongoose.Schema({
    timestamp: {type: Date, required: true},
    productos: {type: [], required: false},
});