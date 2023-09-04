const { Schema, model } = require("mongoose")

const moment = require("moment-timezone");
moment.tz.setDefault("America/Argentina/Buenos_Aires");

const cursoSchema = new Schema({
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

module.exports = model("Curso", cursoSchema)