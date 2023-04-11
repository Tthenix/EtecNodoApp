import React from "react";
import { Linkedin, Github } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import "./index.css";

const Footer = () => (
  <footer className="footer">
    <div className="contrast-footer footer-shadow-dark text-center text-white bg-dark ">
      <div className="container d-flex flex-column">
        <div className="container">
          <div className="row">
            <div className="row-md-auto fs-4">Hecho por:</div>
            <div className="col">

              <Link to="https://www.linkedin.com/in/nahuel-quiroga/">
                <Linkedin size="70" className="Linkedin" />
              </Link> Nahuel Quiroga
              <Link to="https://github.com/Tthenix">
                <Github size="70" className="Github" href="google.com" />
              </Link>   
            </div>

            <div className="col">
              <Link to="https://github.com/SantinoVitale">
                <Github size="70" className="Github" />
              </Link>
              Santino Vitale
              <Link to="https://www.linkedin.com/in/santino-vitale-72a6b126a/">
                <Linkedin size="70" className="Linkedin" />
              </Link>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
