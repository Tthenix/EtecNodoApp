import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { usePcContext } from "./Context";

const CrearUsuario = () => {
  
  const navigate = useNavigate();
  const { updateStock, stock } = usePcContext();
  
  
  

  //   nombre: String,
  //   profesor: String,
  //   horaRetirada: Date,
  //   cantidad: Number,
  //   horaEntrega: Date

  const ValorInicial = {
    nombre: "",
    profesor: "",
    horaRetirada: 18,
    cantidad: 0,
    horaEntrega: "",
    codigo:"",
  };

  const [usuario, setUsuario] = useState(ValorInicial);

  const capturarDatos = (e) => {
    const { name, value } = e.target;
    setUsuario({ ...usuario, [name]: value });
  };

  const guardarDatos = async (e) => {
    e.preventDefault();
    console.log(usuario);

    //logica peticion post
    const newUser = {
      nombre: usuario.nombre,
      profesor: usuario.profesor,
      cantidad: usuario.cantidad,
      horaRetirada: usuario.horaRetirada,
      horaEntrega: usuario.horaEntrega,
      codigo: usuario.codigo,
    };

    await axios.post("http://localhost:3001/api/cursos", newUser);
    updateStock(stock - usuario.cantidad);
    setUsuario({ ...ValorInicial});

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
    <div className="Crear">
      <div className="col-md-6 offset-md-3 align-center">
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
                className="form-control"
                placeholder="ingresar codigo de computadora"
                required
                name="codigo"
                value={usuario.codigo}
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