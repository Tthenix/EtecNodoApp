import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { usePcContext } from "./Context";

const CrearUsuario = () => {
  const navigate = useNavigate();
  const { updateStock, stock } = usePcContext();

  const ValorInicial = {
    nombre: "",
    profesor: "",
    horaRetirada: "",
    cantidad: 0,
    horaEntrega: "",
    codigo: "",
  };
  const codigoRef = useRef(null);
  useEffect(() => {
    // Enfocar el campo de código al cargar el componente
    if (codigoRef.current) {
      codigoRef.current.focus();
    }
  }, []);
  const [usuario, setUsuario] = useState(ValorInicial);

  const handleCodigoKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setUsuario((prevUsuario) => ({
        ...prevUsuario,
        cantidad: prevUsuario.cantidad + 1,
        codigo: prevUsuario.codigo.trim() + "/", // Agregar una barra
      }));
    } else if (e.key === "Backspace" && usuario.codigo.endsWith("/")) {
      e.preventDefault();
      setUsuario((prevUsuario) => ({
        ...prevUsuario,
        cantidad: prevUsuario.cantidad - 1,
        codigo: prevUsuario.codigo.slice(0, -1), // Eliminar la última barra
      }));
    }
  };

  const capturarDatos = (e) => {
    const { name, value } = e.target;
    setUsuario({ ...usuario, [name]: value });
  };

  const guardarDatos = async (e) => {
    e.preventDefault();

    const newUser = {
      nombre: usuario.nombre,
      profesor: usuario.profesor,
      cantidad: usuario.cantidad,
      horaRetirada: usuario.horaRetirada,
      horaEntrega: usuario.horaEntrega,
      codigo: usuario.codigo,
    };

    const newStock = stock - usuario.cantidad;
    if (newStock > 0) {
      await axios.post("http://localhost:3001/api/cursos", newUser);
      updateStock(stock - usuario.cantidad);
    } else {
      Swal.fire("ERROR", "Se acabó el stock", "error");
    }
    setUsuario({ ...ValorInicial });
  };

  const alert = () => {
    Swal.fire({
      title: "Do you want to save the changes?",
      confirmButtonText: "Save",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate({ pathname: "/" });
      }
    });
  };
  return (
    <div className="Crear flexContainer">
      <div className="col-md-10 listas offset-md-3 align-center formCard">
        <div className="card card-body">
          <form onSubmit={guardarDatos}>
            <h2 className="text-center">Registrar retiro</h2>

            <div className="mb-3">
              <label>Registra:</label>

              <input
                type="text"
                className="form-control"
                placeholder="ingresar el nombre del usuario"
                required
                name="nombre"
                value={usuario.nombre}
                onChange={capturarDatos}
              />
            </div>

            <div className="mb-3">
              <label>Curso:</label>

              <input
                type="text"
                className="form-control"
                placeholder="ingresar nombre del profesor"
                required
                name="profesor"
                value={usuario.profesor}
                onChange={capturarDatos}
              />
            </div>

            <div className="mb-3">
              <label>Cantidad:</label>

              <input
                type="number"
                className="form-control"
                placeholder="ingresar cantidad de computadoras retiradas"
                required
                name="cantidad"
                value={usuario.cantidad}
                onChange={capturarDatos}
              />
            </div>
            <div className="mb-3">
              <label>Codigo de computadora:</label>

              <textarea
                ref={codigoRef} // Asignar la referencia al campo
                className="form-control"
                placeholder="ingresar codigo de computadora"
                required
                name="codigo"
                value={usuario.codigo}
                onKeyDown={handleCodigoKeyDown}
                onChange={capturarDatos}
              />
            </div>
            <button className="btn btn-primary form-control" onClick={alert}>
              Guardar retiro
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};


export default CrearUsuario;