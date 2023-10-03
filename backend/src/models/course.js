import mongoose from "mongoose";
import moment from "moment-timezone";

moment.tz.setDefault("America/Argentina/Buenos_Aires");

const courseCollection = "Curso";

const courseSchema = new mongoose.Schema({
    nombre: String,
    profesor: String,
    horaRetirada: Date,
    cantidad: Number,
    horaEntrega: Date,
    codigo: String,
    tipoArticulo: [String],
},
    {
        timestamps: true
    })

export const courseModel = mongoose.model(courseCollection, courseSchema)