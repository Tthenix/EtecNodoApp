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
    tipoArticulo: [],
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
    }
  };

  const capturarDatos = (e) => {
    const { name, value, options } = e.target;

    if (name === "tipoArticulo") {
      const selectedOptions = Array.from(options)
        .filter((option) => option.selected)
        .map((option) => option.value);

      setUsuario({ ...usuario, [name]: selectedOptions });
    } else {
      setUsuario({ ...usuario, [name]: value });
    }
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
      tipoArticulo: usuario.tipoArticulo,
    };

    const newStock = stock - usuario.cantidad;
    if (newStock > 0) {
      await axios.post("/api/cursos", newUser);
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
                placeholder="ingrese nombre del registrador"
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
                placeholder="curso que realiza el retiro"
                required
                name="profesor"
                value={usuario.profesor}
                onChange={capturarDatos}
              />
            </div>

            <div className="mb-3">
              <label>Seleccionar tipo(s) de dispositivos:</label>
              <select
                className="form-control"
                required
                name="tipoArticulo"
                multiple // Permitir selecciones múltiples
                value={usuario.tipoArticulo}
                onChange={capturarDatos}
              >
                <option value="notebook">Notebook</option>
                <option value="proyecto">Proyector</option>
                <option value="parlante">Parlante</option>
                {/* Agrega más opciones según tus necesidades */}
              </select>
            </div>

            <div className="mb-3">
              <label>Hora de Entrega:</label>
              <input
                type="datetime-local" // Usa el tipo 'datetime-local' para capturar la hora y fecha
                className="form-control"
                required
                name="horaEntrega"
                value={usuario.horaEntrega}
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
              <label>Codigos:</label>

              <textarea
                ref={codigoRef} // Asignar la referencia al campo
                className="form-control"
                placeholder="ingresar codigos de dispositivos"
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