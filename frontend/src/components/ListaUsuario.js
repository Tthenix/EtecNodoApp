import axios from 'axios'
import React, { useEffect, useState } from 'react'

const ListaUsuario = () => {
  
  const [lista, setLista] = useState([])

  useEffect(() =>{
    const getLista = async() =>{
      const res = await axios.get("http://localhost:3001/api/cursos")
      setLista(res.data)
    }
    getLista();
  },[lista])

  const eliminarCurso = async(id)=>{
    await axios.delete("http://localhost:3001/api/cursos/" + id)
  }

  return (
    <div className='row'>
      {
        lista.map(cursos => (
          <div className='col md-4 p-2' key={cursos._id}>
            <div className='card'>
              <div className='card-header'>
                <div>
                  <h5>Nombre {cursos.nombre}</h5>
                </div>

                <div className='card-body'>
                  <p>Profesor: {cursos.profesor}</p>
                  <p>Cantidad: {cursos.cantidad}</p>
                </div>

                <div className='card-footer'>
                  <button className='btn btn-danger' onClick={() => eliminarCurso(cursos._id)}>
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          </div>
          ))
      }
    </div>
  )
}

export default ListaUsuario