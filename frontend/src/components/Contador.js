import React from "react";
import { usePcContext } from "./Context";

const Contador = () => {
  const { stock } = usePcContext();

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="text-center">
        <h3 className="mb-3">Cantidad de Computadoras en Stock</h3>
        <div className="card">
          <div className="card-body">
            <h2 className="card-title">{stock}</h2>
            <p className="card-text">computadoras disponibles</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contador;