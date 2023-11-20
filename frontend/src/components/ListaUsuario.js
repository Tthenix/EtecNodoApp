import axios from "axios";
import React, { useEffect, useState } from "react";
import Contador from "./Contador";
import { usePcContext } from "./Context";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment-timezone";

const ListaUsuario = () => {
  const [lista, setLista] = useState([]);
  const { findIdStock, stock, updateStock, user } = usePcContext();
  const [codigosVisible, setCodigosVisible] = useState({});
  const [editingCourse, setEditingCourse] = useState(null);
  const [entregasRealizadas, setEntregasRealizadas] = useState([]); // Array de cursos entregados
  const [coursesWithExpiredDelivery, setCoursesWithExpiredDelivery] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  const editarCurso = (cursoId) => {
    setEditingCourse(cursoId);
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("/api/cursos");
      const cursosData = res.data.payload.cursos.map((curso) => {
        const horaRetiradaArgentina = moment(curso.horaRetirada).tz("America/Argentina/Buenos_Aires").format("YYYY-MM-DD HH:mm:ss");
        const updatedAtArgentina = moment(curso.updatedAt).tz("America/Argentina/Buenos_Aires").format("YYYY-MM-DD HH:mm:ss");
        const horaEntregaAtArgentina = moment(curso.horaEntrega).tz("America/Argentina/Buenos_Aires").format("YYYY-MM-DD HH:mm:ss");
        return { ...curso, horaRetirada: horaRetiradaArgentina, updatedAt: updatedAtArgentina, horaEntrega: horaEntregaAtArgentina };
      });
      setLista(cursosData);

      if (stock === 120) {
        const stockRetirado = cursosData.reduce((total, curso) => total + curso.cantidad, 0);
        updateStock(stock - stockRetirado);
      }

      const timer = setInterval(() => {
        const cursosConEntregaVencida = cursosData.filter((curso) => moment(curso.horaEntrega).isBefore(moment()));
        if (cursosConEntregaVencida.length > 0) {
          setCoursesWithExpiredDelivery(cursosConEntregaVencida);
          setShowAlert(true);
        } else {
          setCoursesWithExpiredDelivery([]);
          setShowAlert(false);
        }
      }, 1000);

      return () => clearInterval(timer);
    };
      fetchData();
  }, [stock]);

  const eliminarCurso = async (id) => {
    await axios.delete("/api/cursos/" + id);
    findIdStock(lista, id);

    const res = await axios.get("/api/cursos");
    const cursosData = res.data.map((curso) => {
      // Formatea la hora de retirada a la zona horaria de Argentina (Buenos Aires)
      const horaRetiradaArgentina = moment(curso.horaRetirada).tz("America/Argentina/Buenos_Aires").format("YYYY-MM-DD HH:mm:ss");
      // Formatea la hora de actualización (updatedAt) a la zona horaria de Argentina (Buenos Aires)
      const updatedAtArgentina = moment(curso.updatedAt).tz("America/Argentina/Buenos_Aires").format("YYYY-MM-DD HH:mm:ss");
      const horaEntregaAtArgentina = moment(curso.horaEntrega).tz("America/Argentina/Buenos_Aires").format("YYYY-MM-DD HH:mm:ss");
      return { ...curso, horaRetirada: horaRetiradaArgentina, updatedAt: updatedAtArgentina, horaEntrega: horaEntregaAtArgentina };
    });
    setLista(cursosData);

    setCoursesWithExpiredDelivery((prevCourses) => prevCourses.filter((curso) => curso._id !== id));
    setShowAlert(false); // Ocultar la alerta después de entregar un curso

    // Reiniciar la página
    window.location.reload();
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
            <div className="col-md-10 mb-2 mt-4">
              {showAlert && coursesWithExpiredDelivery.length > 0 && (
                <div className="alert alert-danger">
                  <p>¡La hora de entrega ha pasado para los siguientes cursos:</p>
                  <ul>
                    {coursesWithExpiredDelivery.map((curso) => (
                      <li key={curso._id}>
                        {curso.nombre} (curso: {curso.profesor})
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            {lista.map((cursos) => (
              <div className="col-md-4 col-sm-6 p-2" key={cursos._id}>
                <div className="card shadow">
                  <div className="card-header">
                    <div>
                      <h5>Registra: {cursos.nombre}</h5>
                    </div>
                  </div>
                  <div className="card-body">
                    <p>Curso: {cursos.profesor}</p>
                    <p>Cantidad: {cursos.cantidad}</p>
                    <p>
                      Artículos:
                      {cursos.tipoArticulo.map((tipo, index) => (
                        <span key={index}>
                          {index > 0 && ", "} {/* Separador de comas entre tipos */}
                          {tipo}
                        </span>
                      ))}
                    </p>
                    <p>Fecha y hora de retirada: {cursos.horaRetirada}</p>
                    <p>Fecha y hora de actualización: {cursos.updatedAt}</p>
                    <p>Fecha y hora de entrega: {cursos.horaEntrega}</p>
                  </div>

                  <div className="card-footer">
                    <div className="mb-2">
                      <button
                        className="btn btn-success form-control"
                        onClick={() => eliminarCurso(cursos._id)}
                        disabled={entregasRealizadas.includes(cursos._id)}
                      >
                        Entregar
                      </button>
                    </div>
                    <div className="mb-2">
                      <Link to={`/editpage/${cursos._id}`}>
                        <button className="btn btn-primary form-control">
                          Editar
                        </button>
                      </Link>
                    </div>
                    <div className="mb-2">
                      <button
                        className="btn btn-secondary form-control"
                        onClick={() => toggleCodigosVisible(cursos._id)}
                      >
                        {codigosVisible[cursos._id] ? 'Ocultar Códigos' : 'Mostrar Códigos'}
                      </button>
                    </div>
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
        <div className="col-12 col-md-2">
          <Contador onAdd={onAdd} initial={1} />
        </div>
      </div>
    </div>
  );
};

export default ListaUsuario;