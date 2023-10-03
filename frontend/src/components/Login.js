import React, { useEffect, useState } from "react";
import {Form, FormGroup, Label, Input, Button} from "reactstrap"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./index.css";
import { usePcContext } from "./Context";

const Login = () => {
  const navigate = useNavigate();
  const {getUser} = usePcContext();

  const ValorInicial = {
    email: "",
    password: ""
  };

  const [usuario, setUsuario] = useState(ValorInicial);
  
  const checkLogin = async (e) => {
    e.preventDefault();
    const newUser = {
      email: usuario.email,
      password: usuario.password
    };
    const response = await axios.post("http://localhost:3001/api/users/login", newUser);
    if(response.data.valid){
      console.log(response);
      setUsuario({ ...ValorInicial });
      getUser(response.data.user)
      return navigate("/")
    } else{
      alert("Algo está mal")
    }
  };

  const capturarDatos = (e) => {
    const { name, value } = e.target;
    
    setUsuario({ ...usuario, [name]: value });
  };

  return (
    <div className="Crear flexContainer">
      <div className="col-md-10 listas offset-md-3 align-center formCard">
        <div className="card card-body">
          <h1 className="">Login</h1>
          <Form onSubmit={checkLogin}>
            <FormGroup>
              <Label
                for="exampleEmail"
                hidden
              >
                Email
              </Label>
              <Input
                id="exampleEmail"
                name="email"
                placeholder="Email"
                type="email"
                value={usuario.email}
                onChange={capturarDatos}
              />
            </FormGroup>
            {' '}
            <FormGroup>
              <Label
                for="examplePassword"
                hidden
              >
                Password
              </Label>
              <Input
                id="examplePassword"
                name="password"
                placeholder="Password"
                type="password"
                value={usuario.password}
                onChange={capturarDatos}
              />
            </FormGroup>
            {' '}
            <Button>
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Login;