const moment = require("moment-timezone");
const cursoCtrl = {}

const Curso = require("../models/user");

cursoCtrl.getCurso = async (req, res) => {
    const cursos = await Curso.find();
    res.json(cursos);
};

cursoCtrl.createCurso = async (req, res) => {
    const { nombre, profesor, cantidad, horaEntrega, codigo, tipoArticulo } = req.body;

    // Obtener la hora actual en la zona horaria de Argentina
    const horaRetirada = moment().tz("America/Argentina/Buenos_Aires").format();

    const newCurso = new Curso({ nombre, profesor, horaRetirada, cantidad, horaEntrega, codigo, tipoArticulo });
    await newCurso.save();
    res.json({ message: "El curso ha sido añadido" });
};

cursoCtrl.getCursoEspecifico = async (req, res) => {
    const curso = await Curso.findById(req.params.id);
    res.json(curso);
};

cursoCtrl.deleteCurso = async (req, res) => {
    await Curso.findByIdAndDelete(req.params.id);
    res.json({ message: "El curso fue eliminado" });
};

cursoCtrl.updateCurso = async (req, res) => {
    const { nombre, profesor, horaRetirada, cantidad, horaEntrega, codigo, tipoArticulo } = req.body;
    await Curso.findByIdAndUpdate(req.params.id, {
        nombre,
        profesor,
        horaRetirada,
        cantidad,
        horaEntrega,
        codigo,
        tipoArticulo, // Usa el valor del formulario para tipoArticulo
    });
    res.json({ message: "El curso fue actualizado" });
};

module.exports = cursoCtrl;
