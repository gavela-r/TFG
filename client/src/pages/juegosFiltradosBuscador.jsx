import { useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Buscador } from "../components/buscador";
import { CarritoContext } from "../../context/CarritoContext";
import { FavoritosContext } from "../../context/FavoritosContext";
import '../css/main.css';

export function FiltroBuscador(){
    const location = useLocation();
    const resultados = location.state?.resultados || [];
    const {agregarAlCarrito} = useContext(CarritoContext);
    const [pagina, setPagina] = useState(1);
    const {favoritos, añadirFavoritos, eliminarFavoritos} = useContext(FavoritosContext);
    const juegosPerPage = 10;

    const juegosMostrados = resultados.slice(
        (pagina - 1) * juegosPerPage,    
        pagina * juegosPerPage
        );

   function favorito(juego){
        const yaEsFavorito = favoritos.find(f => f.id === juego.id);

        if(yaEsFavorito){
            eliminarFavoritos(juego.id);
        }else{
            añadirFavoritos({
                id: juego.id,
                nombre: juego.nombre,
                foto: juego.foto,
                fecha: juego.fecha
            })
        }
    }

     return (
            <>
                <Buscador />
                <main>
                    <div className="juegos">
                       {juegosMostrados.length === 0 ? (
                            <h5>No se ha encontro ningun juego</h5>
                       ) : (

                        juegosMostrados.map((juego, index) =>(
                            <div key={index} className='juego'>
                                <i className={`fa-solid fa-heart corazon ${favoritos.find(f => f.id === juego.id) ? "activo" : ''}`} onClick={() => favorito(juego)}></i>
                                <img src={juego.foto} alt={juego.nombre} className="fotoJuego"/>
                                <div className="descripcion">
                                    <h2>{juego.nombre}</h2>
                                    <p>{new Date(juego.fecha_lanzamiento).toLocaleDateString('es-ES')}</p>
                                </div>
                                <div className="boton" onClick={() => agregarAlCarrito({
                                    nombre: juego.nombre,
                                    fecha: new Date(juego.fecha_lanzamiento).toLocaleDateString('es-ES'),
                                    imagen: juego.foto,
                                    precio: juego.precio,
                                })}>Comprar</div>
                            </div>
                          
                       ))
                    )}
                    </div>
                       <div className="paginacion">
                            <button className="anterior" disabled={pagina === 1} onClick={() => setPagina(p => p - 1)}>Anterior</button>
                            <i className="left fa-solid fa-arrow-left"></i>
                            <span className="pagina">Página {pagina}</span>
                            <i className="right fa-solid fa-arrow-right"></i>
                            <button className="siguiente" onClick={() => setPagina(p => p + 1)}>Siguiente</button>
                       </div>
                </main>
            </>
        );
}