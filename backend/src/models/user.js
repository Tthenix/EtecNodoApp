const { Schema, model } = require("mongoose")

const cursoSchema = new Schema({
    nombre: String,
    profesor: String,
    horaRetirada: Date,
    cantidad: Number,
    horaEntrega: Date,
    codigo:String,
},
{
    timestamps: true
})

module.exports = model("Curso", cursoSchema)