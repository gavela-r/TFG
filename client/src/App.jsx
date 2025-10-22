import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './css/App.css'
import {  Routes, Route } from 'react-router-dom'
import { Home } from './home'
import { Registro } from './pages/registrarse'
import { Login } from './pages/login'
import { Layout } from './components/layouts'
import { Principal } from './pages/principal'
import { JuegosFiltrados } from './pages/juegosFiltrados'
function App() {
  

  return (
    <div>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registrarse" element={<Registro />} />
          <Route path='/principal' element={<Principal />} />
          <Route path='/juegosFiltrados' element={<JuegosFiltrados />} />
        </Route>
      </Routes>
 
    </div>
  )
}

export default App
