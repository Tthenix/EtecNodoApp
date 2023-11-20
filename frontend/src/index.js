import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PcProvider from './components/Context';
import Navegacion from "./components/Navegacion";
import CrearUsuario from "./components/CrearUsuario";
import ListaUsuario from "./components/ListaUsuario";
import Footer from "./components/Footer";
import Contador from "./components/Contador"
import StockTotal from "./components/StockTotal";
import EditPage from './components/EditPage';
import Guia from './components/Guia.js';
import Login from './components/Login';
import axios from 'axios';
import Register from './components/Register.js';

const root = ReactDOM.createRoot(document.getElementById('root'));

axios.defaults.baseURL = 'http://localhost:3001';
axios.defaults.withCredentials = true;

root.render(
  <BrowserRouter>
    <PcProvider>
      <React.StrictMode>
        <Navegacion />
        <Routes>
          <Route path="/" element={<ListaUsuario />} />
          <Route path="/CrearUsuario" element={<CrearUsuario />} />
          <Route path="/contador" element={<Contador />} />
          <Route path="/stockTotal" element={<StockTotal />} />
          <Route path="/editpage/:id" element={<EditPage />} />
          <Route path="/guia" element={<Guia />} />
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
        </Routes>
        <Footer />
      </React.StrictMode>
    </PcProvider>
  </BrowserRouter>
);

