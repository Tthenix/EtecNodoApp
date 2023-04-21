import React from "react";
import { usePcContext } from "./Context";




const Contador = () => {
    
    const { stock } = usePcContext();

    return(
      <div>
        <p>Tenes {stock} computadoras</p>
      </div>
    )
}

export default Contador