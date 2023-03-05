require("dotenv").config()
const app = require("./app") 
require("./database")

// ? Lógica para iniciar el servidor
async function main(){
    await app.listen(app.get("port"))
    console.log("El servidor se está ejecutnado en el puerto: " + app.get("port"));
}

main()
