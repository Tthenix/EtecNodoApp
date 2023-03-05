const express = require("express")
const cors = require("cors")
const app = express()

// * Configuracion
app.set("port", process.env.PORT || 3000);

// * Middlewares

app.use(cors())
app.use(express.json())

// * Rutas

app.get("/", (req, res) => {
    res.send("Buenas")
})

// ? ruta para nuestra api de usuarios
app.use("/api/cursos", require("./routes/user"))

module.exports = app
