import axios from "axios";
import React, { useEffect, useState } from "react";
import Contador from "./Contador";
import { usePcContext } from "./Context";

const ListaUsuario = () => {
  const [lista, setLista] = useState([]);
  const { findIdStock, stock, updateStock } = usePcContext();

  useEffect(() => {
    
      const res = axios.get("http://localhost:3001/api/cursos");
      res.then((res) => {
        setLista(res.data)
        const newLista = res.data
        let stockRetirado = 0
        newLista.forEach(element => {
          stockRetirado += element.cantidad;
          console.log(stockRetirado);
          updateStock(stock - stockRetirado)
        });
        
      })
  }, []);
  


  const eliminarCurso = async (id) => {
    await axios.delete("http://localhost:3001/api/cursos/" + id);
    findIdStock(lista, id);

  };

  const onAdd = (qty) => {
    alert(`Entregaste ${qty} computadoras`);
  };

  
  return (
    <div className="row">
      <div className="row">
        <div className="col-md-10">
          {lista.map((cursos) => (
            <div className="col md-4 p-2" key={cursos._id}>
              <div className="card listas shadow">
                <div className="card-header">
                  <div>
                    <h5>Registra: {cursos.nombre}</h5>
                  </div>

                  <div className="card-body">
                    <p>Curso: {cursos.profesor}</p>
                    <p>Cantidad: {cursos.cantidad}</p>
                    <p>Codigo de computadora: {cursos.codigo}</p>
                  </div>

                  <div className="card-footer">
                    <button
                      className="btn btn-danger form-control"
                      onClick={() => eliminarCurso(cursos._id)}
                    >
                      Entregar
                    </button>

                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="col-6 col-md-2"> 
   
        <Contador onAdd={onAdd} initial={1}/>
        </div>
      </div>
    </div>
  );
};


export default ListaUsuario;