import express from "express";
import { controllerCourse } from "../controller/course.controller.js";

export const courseRouter = express.Router()

courseRouter.get("/", controllerCourse.getCourse)

courseRouter.post("/", controllerCourse.createCourse)

courseRouter.get("/:id", controllerCourse.getCourseById)
courseRouter.delete("/:id", controllerCourse.deleteCourse)
courseRouter.put("/:id", controllerCourse.updateCourse)