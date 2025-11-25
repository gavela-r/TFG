import { useLocation } from "react-router-dom";
import '../css/main.css';
import { Buscador } from "../components/buscador";
import { useState, useEffect, useContext } from "react";
import { CarritoContext } from "../../context/CarritoContext";
import { ModalLoading } from "../components/modalLoading";
import { FavoritosContext } from "../../context/FavoritosContext";


export function JuegosFiltrados(){
    const location = useLocation();
    const genero = location.state?.genero || [];
    const [categorias, setCategoria] = useState([]);
    const {agregarAlCarrito} = useContext(CarritoContext);
    const [loading, setLoading] = useState(false);
    const {favoritos, añadirFavoritos, eliminarFavoritos} = useContext(FavoritosContext)

    const [pagina, setPagina] = useState(1);
    const juegosPerPage = 10;
    
    

    useEffect(() =>{
        setLoading(true)
        fetch(`/juegos/filtro?genero=${genero}&pagina=${pagina}&limite=${juegosPerPage}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res =>{
            if(res.ok){
                return res.json();
            }else{
                throw new Error("No se pudo obtener los juegos")
            }
        })
        .then(data =>{
            setCategoria(data.results);
            
        })
        .finally(() =>{
            setLoading(false);
        })
        
    },[genero, pagina])
    
    function favorito(juego){
        const yaEsFavorito = favoritos.find(f => f.id === juego.id);

        if(yaEsFavorito){
            eliminarFavoritos(juego.id)
        }else{
            añadirFavoritos({
                id: juego.id,
                nombre: juego.nombre,
                foto: juego.foto,
                fecha: juego.fecha,
            })
        }


    }
    
    return (
        <>
            <ModalLoading show={loading} />
            <Buscador />
            <main>
                <div className="juegos">
                    {categorias.map((juego, index) =>(
                        <div key={index} className='juego'>
                            <i className={`fa-solid fa-heart corazon ${favoritos.find(f => f.id === juego.id) ? "activo" : ''}`} onClick={() => favorito(juego)}></i>
                            <img src={juego.foto} alt={juego.nombre} className="fotoJuego"/>
                            <div className="descripcion">
                                <h2>{juego.nombre}</h2>
                                <p>{new Date(juego.fecha_lanzamiento).toLocaleDateString('es-ES')}</p>
                                <p>{juego.precio}</p>
                            </div>
                            <div className="boton" onClick={() => agregarAlCarrito({
                                nombre: juego.nombre,
                                fecha: new Date(juego.fecha_lanzamiento).toLocaleDateString('es-ES'),
                                imagen: juego.foto,
                                prtecio: juego.precio,
                            })}>Comprar</div>
                        </div>
                    ))}
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