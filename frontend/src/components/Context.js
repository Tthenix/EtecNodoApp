/*############################################ 
                Importaciones
##############################################*/
import Swal from "sweetalert2";
// ! useContext (usar el contexto creado), createContext (Crear el contexto de la aplicacion) => React

import { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//! 1° Crear el contexto - Valor dentro del argumento de la funcion es el valor por default del contexto
//! 2° Exportar el contexto creado
export const pcContext = createContext([]);
//! 3° Crear nuestra funcion para poder dar el contexto
//! 4° Podemos definirlo como un hook personalizado
//! 5° Exportar la funcion que almacena el hook useContext
export const usePcContext = () => { return (useContext(pcContext))}

//! 6° Crear el componente del contexto proveedor


const PcProvider = ({children}) => {
    
    const navigate = useNavigate()
    const [stock, setStock] = useState(120)
    const [user, setUser] = useState(null);

    useEffect(() => {
        if(!user){
            axios.get("/api/users/getUser").then((data) => {
                console.log(data);
                if(!data.data.valid)
                {
                if(window.location.pathname !== "/register")
                    navigate("/login");

                setUser(null);
                }
                else
                {
                    setUser(data.data.payload)
                }
            })
        }
    },[])
    
    const updateStock = (newStock) => {
        setStock(newStock);
    }

    const findIdStock = (data, id) => {
        const listaEncontrada = data.find(element => element._id === id);
        
        if (stock + listaEncontrada > 120){
            Swal.fire(
                'ERROR',
                'No se por qué, pero esto no deberia estar pasando',
                'error'
              )
        } else {
            setStock(stock + listaEncontrada.cantidad)
        }
    }

    return(
        <pcContext.Provider value={{stock, updateStock, findIdStock, user, setUser}}>
            {children}
        </pcContext.Provider>
    )
}

export default PcProvider;
