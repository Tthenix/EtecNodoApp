const { Router } = require("express")
const router = Router()

const { getCurso, createCurso, getCursoEspecifico, deleteCurso, updateCurso  } = require("../controller/curso.controller")

router.route("/")

    .get(getCurso)
    .post(createCurso)

router.route("/:id")
    .get(getCursoEspecifico)
    .delete(deleteCurso)
    .put(updateCurso)

module.exports = router