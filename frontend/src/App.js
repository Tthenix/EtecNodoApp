import {Routes, Route} from "react-router-dom"

import Navegacion from './components/Navegacion';
import CrearUsuario from './components/CrearUsuario'
import ListaUsuario from './components/ListaUsuario';
import Footer from './components/Footer'

function App() {
  return (
    <div className="">
      <Navegacion/>
     
      <div className='conteiner p-4'>
        <Routes>
          <Route path='/' element={<ListaUsuario/>} />
          <Route path='/CrearUsuario' element={<CrearUsuario/>} />
          <Route path='/edit/:id' element={<CrearUsuario/>} />
        </Routes>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
