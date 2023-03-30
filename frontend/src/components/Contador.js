import React, { useState } from "react";
import axios from "axios";

const Contador = () => {
    const Stock = (120)

    const capturarDatos = async (e) => {
        e.preventDefault();
        await axios.get("http://localhost:3001/api/cursos");
      };
    
    const [count, setCount] = useState(120);

    return(
    <div>
        <p>Tenes {count} computadoras</p>
        <button onClick={() => setCount(count + 1)}>
          Click me
        </button>
      </div>
    )
}

export default Contador