import moment from "moment-timezone";
import { courseModel } from "../models/course.js";

class ControllerCourse {
    async getCourse(req, res){
        const cursos = await courseModel.find();
        return res.status(200).json({
            status: "success",
            payload:{
                cursos
            }
        });
    }

    async createCourse(req, res){
        const { nombre, profesor, cantidad, horaEntrega, codigo, tipoArticulo } = req.body;

        // Obtener la hora actual en la zona horaria de Argentina
        const horaRetirada = moment().tz("America/Argentina/Buenos_Aires").format();

        const newCurso ={
            nombre, 
            profesor, 
            horaRetirada, 
            cantidad, 
            horaEntrega, 
            codigo, 
            tipoArticulo
        };
        const response = await courseModel.create(newCurso);
        return res.json({ message: "El curso ha sido añadido", payload: {response}});
    }

    async getCourseById(req, res){
        const curso = await courseModel.findById(req.params.id);
        return res.json(curso);
    }

    async deleteCourse(req, res){
        await courseModel.findByIdAndDelete(req.params.id);
        return res.json({ message: "El curso fue eliminado" });
    }

    async updateCourse(req, res){
        const { nombre, profesor, horaRetirada, cantidad, horaEntrega, codigo, tipoArticulo } = req.body;
        await courseModel.findByIdAndUpdate(req.params.id, {
            nombre,
            profesor,
            horaRetirada,
            cantidad,
            horaEntrega,
            codigo,
            tipoArticulo, // Usa el valor del formulario para tipoArticulo
        });
        return res.json({ message: "El curso fue actualizado" });
        }
}

export const controllerCourse = new ControllerCourse()
