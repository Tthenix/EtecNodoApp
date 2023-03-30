// Componente que muestra el stock total disponible
// import { useState,useEffect } from 'react';
// import axios from 'axios';

// function StockLogica({ cursos }) {
//     const StockLogica = 120 - cursos.reduce((total, curso) => total + curso.cantidad, 0);
  
//     return (
//       <div>
//         <h2>Stock Total Disponible: {StockLogica}</h2>
//       </div>
//     );
//   }
  
//   // Componente principal de la aplicación
//   function StockTotal() {
//     const [cursos, setCursos] = useState([]);
  
//     useEffect(() => {
//       // Obtener la lista de cursos desde la API
//       const fetchCursos = async () => {
//         try {
//           const response = await axios.get(`${apiUrl}/cursos`);
//           setCursos(response.data);
//         } catch (error) {
//           console.log(error);
//         }
//       };
  
//       fetchCursos();
//     }, []);
  
//     const handleRetirar = cursoActualizado => {
//       // Actualizar la lista de cursos con el curso actualizado
//       setCursos(cursos => cursos.map(curso => (curso._id === cursoActualizado._id ? cursoActualizado : curso)));
//     };
  
//     const handleEntregar = cursoActualizado => {
//       // Actualizar la lista de cursos con el curso actualizado
//       setCursos(cursos => cursos.map(curso => (curso._id === cursoActualizado._id ? cursoActualizado : curso)));
//     };
  
//     return (
//       <div>
//         <h1>Cursos Disponibles</h1>
//         <StockLogica cursos={cursos} />
//         <CursosList cursos={cursos} onRetirar={handleRetirar} onEntregar={handleEntregar} />
//       </div>
//     );
//   }
  
//   export default StockTotal;
  