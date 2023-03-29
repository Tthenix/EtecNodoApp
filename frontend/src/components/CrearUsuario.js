import React, { useState } from "react";
import axios from "axios"
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";


const CrearUsuario = () => {

  const navigate = useNavigate();

  //   nombre: String,
  //   profesor: String,
  //   horaRetirada: Date,
  //   cantidad: Number,
  //   horaEntrega: Date

  const ValorInicial ={
    nombre: "",
    profesor: "",
    horaRetirada: 18,
    cantidad:0,
    horaEntrega:""
  }

  const [usuario, setUsuario] = useState(ValorInicial)

  const capturarDatos = (e) =>{
    const {name, value} = e.target
    setUsuario({...usuario, [name]: value})
  }

  const guardarDatos = async(e)=>{
      e.preventDefault();
      console.log(usuario)

      //logiaca peticion post
      const newUser = {
        nombre:usuario.nombre,
        profesor:usuario.profesor,
        cantidad:usuario.cantidad,
        horaRetirada:usuario.horaRetirada,
        horaEntrega:usuario.horaEntrega,
      }

      await axios.post('http://localhost:3001/api/cursos', newUser)

      setUsuario({...ValorInicial})
  }

  const alert = () => {
    Swal.fire({
      title: 'Do you want to save the changes?',
      confirmButtonText: 'Save',
    }).then((result) => {
      if (result.isConfirmed) {
        navigate({ pathname: '/' });
      }
    })
}

  return (
    <div className="col-md-6 offset-md-3">
      <div className="card card-body">
        <form onSubmit={guardarDatos}>
          <h2 className="text-center">Crear usuario</h2>

          <div className="mb-3">
            <label>Nombre:</label>

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
            <label>Profesor:</label>

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
            <label>cantidad:</label>

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

          {/* <div className="mb-3">
            <label>horaRetirada:</label>

            <input
              type="number"
              className="form-control"
              placeholder="ingresar hora de retirada"
              required
              name="horaRetirada"
              value={usuario.horaRetirada}
              onChange={capturarDatos}
            />
          </div>

          <div className="mb-3">
            <label>horaEntrega:</label>

            <input
              type="number"
              className="form-control"
              placeholder="hora de entrega"
              required
              name="horaEntrega"
              value={usuario.horaEntrega}
              onChange={capturarDatos}
            />
          </div> */}
          <button className="btn btn-primary form-control" onClick={alert}>Guardar usuario</button>
        </form>
      </div>
    </div>
  );
};

export default CrearUsuario;
