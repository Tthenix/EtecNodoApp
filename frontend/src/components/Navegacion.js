import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { usePcContext } from "./Context";
import axios from "axios";

const Navegacion = () => {
  const {user, setUser} = usePcContext();
  const navigate = useNavigate()

  const logout = async () => {
    const res = await axios.get("/api/users/logout")
    setUser(null)
    return navigate(res.data.redirect)
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
        <div className="container">
          {user ? (
            <Link className="navbar-brand" to="/">
            NodoApp
            </Link>
          ): (
            <Link className="navbar-brand">
            NodoApp
            </Link>
          )}
          
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse " id="navbarNav">
            <ul className="navbar-nav ms-auto">
            {!user ? (
              <>
              <li className="nav-item">
                <Link className="nav-link p-4 text-white" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link p-4 text-white" to="/register">
                  Register
                </Link>
              </li>
              </>
            )
            :
            (
              <>
              <li className="nav-item">
                <Link className="nav-link p-4 text-white" onClick={logout}>
                  Logout
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link p-4 text-white" to="/guia">
                  Como usar la NodoApp?
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link p-4 text-white" to="/">
                  Dashboard
                </Link>
              </li>
              
              <li className="nav-item">
                <Link className="nav-link p-4 text-white" to="/CrearUsuario">
                  Realizar retiro
                </Link>
              </li>
              </>
            )}
              
            </ul>
          </div>

        </div>
      </nav>
    </div>
  );
};

export default Navegacion;
