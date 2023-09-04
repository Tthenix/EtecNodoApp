import React from "react";

//imagenes
import realziarRetiro from "../img/RealizarRetiro.PNG"
import RegistrarRetiro from "../img/RegistrarRetiro.PNG"
import EjemploDeRetiro from "../img/EjemploDeRetiro.PNG"

const Guia = () => {
    return (
        <div className="bg-gray-100 p-4">
            <div className="container mx-auto p-4">
                <h1 className="text-4xl font-bold mb-4">Como usar la NodoApp</h1>
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">1. Instrucciones Iniciales</h2>
                    <p className="mb-2">Para comenzar en Realizar retiro podes crear el retiro a realizar ya sea de notebook, proyectores, parlantes etc</p>
                    <img src={realziarRetiro} alt="Instrucción 1" className="mb-4 max-w-full" />

                    <p className="mb-2">Al realizar un retiro tenes que ingresar:</p>
                    <ul className="list-disc pl-5">
                        <li>Nombre del que crear el retiro ejemplo Luis.</li>
                        <li>Curso para que realiza el retiro ejemplo 6 Informatica.</li>
                        <li>Si es Notebook, Proyector o parlante para selecionar mas de 1 tenes que apretar el Ctrl.</li>
                        <li>La hora de entrega de los dispositivos</li>
                        <li>Cantidad a retirar lo podes hacer manual o automatico.</li>
                        <li>Codigos de los dispositivos con el escaner.</li>
                    </ul>
                    <p className="mb-2">Una vez terminado de ingresar todo le das a guardar registro.</p>
                    <img src={RegistrarRetiro} alt="Instrucción 1" className="mb-4 max-w-full" />

                </section>
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">2. Uso Básico</h2>
                </section>
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">3. Funciones Avanzadas</h2>
                </section>
            </div>
        </div>
    );
};

export default Guia;