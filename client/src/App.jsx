import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './css/App.css'
import {  useNavigate, Routes, Route } from 'react-router-dom'
import { Home } from './home'
import { Registro } from './pages/registrarse'
import { Login } from './pages/login'
import { Layout } from './components/layouts'
import { Principal } from './pages/principal'
import { JuegosFiltrados } from './pages/juegosFiltrados'
import { EditarPerfil } from './pages/editarPerfil'
import { CarritoProvider } from '../context/CarritoContext';
import { isTokenExpired } from './helper/auth';
import { FiltroBuscador } from './pages/juegosFiltradosBuscador'
import { Favoritos } from "./pages/favoritos";
import { useEffect } from 'react';
import { FavoritosProvider } from '../context/FavoritosContext';
import { Compra } from './pages/compra';


function App() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  
  useEffect(() =>{
    if(isTokenExpired(token)){
      localStorage.clear();
      navigate('/');
    }
  }, [])

  return (
    <div>
      <FavoritosProvider>
        <CarritoProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/registrarse" element={<Registro />} />
              <Route path='/principal' element={<Principal />} />
              <Route path='/juegosFiltrados' element={<JuegosFiltrados />} />
              <Route path='/juegosFiltradosBuscador' element={<FiltroBuscador />} />
              <Route path='/editarPerfil' element={<EditarPerfil />} />
              <Route path='/favoritos' element={<Favoritos />} />
              <Route path='/compra' element={<Compra />} />
            </Route>
          </Routes>
        </CarritoProvider>
      </FavoritosProvider>
    </div>
  )
}

export default App
