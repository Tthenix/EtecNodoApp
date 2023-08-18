import axios from "axios";
import React, { useEffect, useState } from "react";
import Contador from "./Contador";
import { usePcContext } from "./Context";

const ListaUsuario = () => {
  const [lista, setLista] = useState([]);
  const { findIdStock, stock, updateStock } = usePcContext();
  const [codigosVisible, setCodigosVisible] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:3001/api/cursos");
      const cursosData = res.data;
      setLista(cursosData);

      if (stock === 120) {
        const stockRetirado = cursosData.reduce((total, curso) => total + curso.cantidad, 0);
        updateStock(stock - stockRetirado);
      }
    };

    fetchData();
  }, [stock]);

  const eliminarCurso = async (id) => {
    await axios.delete("http://localhost:3001/api/cursos/" + id);
    findIdStock(lista, id);
    const res = await axios.get("http://localhost:3001/api/cursos");
    setLista(res.data);
  };

  const toggleCodigosVisible = (cursoId) => {
    setCodigosVisible((prevVisible) => ({
      ...prevVisible,
      [cursoId]: !prevVisible[cursoId],
    }));
  };

  const onAdd = (qty) => {
    alert(`Entregaste ${qty} computadoras`);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-10">
          <div className="row">
            {lista.map((cursos) => (
              <div className="col-md-4 p-2" key={cursos._id}>
                <div className="card shadow">
                  <div className="card-header">
                    <div>
                      <h5>Registra: {cursos.nombre}</h5>
                    </div>
                  </div>
                  <div className="card-body">
                    <p>Curso: {cursos.profesor}</p>
                    <p>Cantidad: {cursos.cantidad}</p>
                  </div>
                  <div className="card-footer">
                    <button
                      className="btn btn-danger form-control"
                      onClick={() => eliminarCurso(cursos._id)}
                    >
                      Entregar
                    </button>
                    <button
                      className="btn btn-secondary form-control mt-2"
                      onClick={() => toggleCodigosVisible(cursos._id)}
                    >
                      {codigosVisible[cursos._id] ? 'Ocultar Códigos' : 'Mostrar Códigos'}
                    </button>
                    {codigosVisible[cursos._id] && (
                      <div>
                        <p>Códigos de computadora:</p>
                        <p>{cursos.codigo}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-6 col-md-2">
          <Contador onAdd={onAdd} initial={1} />
        </div>
      </div>
    </div>
  );
}

export default ListaUsuario;
