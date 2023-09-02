const mongoose = require("mongoose")

// ? cadena de conexion
const URI = process.env.MONGODB_URI
    ? process.env.MONGODB_URI
    : "mongodb://127.0.0.1/NodoApp"

console.log(URI);

mongoose.connect(URI)
    .then(db => console.log("DB funcando papa"))
    .catch(err => console.error(err));

module.exports = mongoose;