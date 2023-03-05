const mongoose = require("mongoose");

const URI = "mongodb://127.0.0.1/NodoApp";

mongoose.connect(URI)
    .then(db => console.log("DB funcando papa"))
    .catch(err => console.error(err));

module.exports = mongoose;