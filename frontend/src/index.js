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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <PcProvider>
    <BrowserRouter>
      <React.StrictMode>
        <Navegacion />
        <Routes>
          <Route path="/" element={<ListaUsuario />} />
          <Route path="/CrearUsuario" element={<CrearUsuario />} />
          <Route path="/contador" element={<Contador />} />
          <Route path="/stockTotal" element={<StockTotal />} />
          <Route path="/editpage/:id" element={<EditPage />} />
          <Route path="/guia" element={<Guia />} />
        </Routes>
        <Footer />
      </React.StrictMode>
    </BrowserRouter>
  </PcProvider>
);

