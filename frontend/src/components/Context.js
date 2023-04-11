/*############################################ 
                Importaciones
##############################################*/
// ! useContext (usar el contexto creado), createContext (Crear el contexto de la aplicacion) => React

import { useContext, createContext, useState } from "react";

//! 1° Crear el contexto - Valor dentro del argumento de la funcion es el valor por default del contexto
//! 2° Exportar el contexto creado
export const pcContext = createContext([]);
//! 3° Crear nuestra funcion para poder dar el contexto
//! 4° Podemos definirlo como un hook personalizado
//! 5° Exportar la funcion que almacena el hook useContext
export const usePcContext = () => { return (useContext(pcContext))}

//! 6° Crear el componente del contexto proveedor


const PcProvider = ({children}) => {

    const [stock, setStock] = useState(120)

    const guardarPC = (n) => {
        setStock(120 - n)
        console.log(stock);
    }

    return(
        <pcContext.Provider value={{guardarPC, stock}}>
            {children}
        </pcContext.Provider>
    )
}

export default PcProvider;
