import React, { Component } from 'react'
import { Linkedin,Github } from "react-bootstrap-icons";
import { Link } from 'react-router-dom';
import './index.css'

const Footer = () =>{
    return( 
        <div className="contrast-footer footer-dark footer-shadow-dark p-5 text-center text-white bg-dark">
            <div className="container d-flex flex-column">
                <div class="container text-center">
                    <div class="row">
                        <div className="row-md-auto fs-3" >
                            Hecho por:
                        </div>
                        <div className="col">
                        <Link to="https://github.com/Tthenix">
                            <Github size="80" className="Github" href='google.com'/>  
                        </Link>Nahuel Quiroga
                        <Link to="https://www.linkedin.com/in/nahuel-quiroga/">
                            <Linkedin size="80" className='Linkedin'/>
                        </Link>
                        </div>
                        
                        <div className="col">
                            <Link to="https://github.com/SantinoVitale">
                                <Github size="80" className="Github" />
                            </Link>Santino Vitale
                            <Link to="https://www.linkedin.com/in/santino-vitale-72a6b126a/">
                                <Linkedin size="80" className='Linkedin'/>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer