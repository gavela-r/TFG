import { useLocation } from "react-router-dom";
import '../css/main.css';
import { Buscador } from "../components/buscador";
import { useState, useEffect, useContext } from "react";
import { CarritoContext } from "../../context/CarritoContext";
import { ModalLoading } from "../components/modalLoading";


export function JuegosFiltrados(){
    const location = useLocation();
    const resultados = location.state?.resultados || [];
    const genero = location.state?.genero || [];
    const [categorias, setCategoria] = useState([]);
    const {agregarAlCarrito} = useContext(CarritoContext);
    const [loading, setLoading] = useState(false);
    const key = '375e3dcc7ff741a7b2d533c02b445fe6';
    const [pagina, setPagina] = useState(1);
    const juegosPerPage = 10;
    let url =  `https://api.rawg.io/api/games?key=${key}&genres=${genero}&page_size=${juegosPerPage}&page=${pagina}`;
    

    useEffect(() =>{
        setLoading(true)
        fetch(url, {
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
    return (
        <>
            <ModalLoading show={loading} />
            <Buscador />
            <main>
                <div className="juegos">
                    {(categorias.length > 0 ? categorias : resultados).map((juego, index) =>(
                        <div key={index} className='juego'>
                            <img src={juego.background_image} alt={juego.name} className="fotoJuego"/>
                            <div className="descripcion">
                                <h2>{juego.name}</h2>
                                <p>{juego.released}</p>
                            </div>
                            <div className="boton" onClick={() => agregarAlCarrito({
                                nombre: juego.name,
                                fecha: juego.released,
                                imagen: juego.background_image
                            })}>Comprar</div>
                        </div>
                    ))}
                </div>
                   <div className="paginacion">
                        <button className="anterior" disabled={pagina === 1} onClick={() => setPagina(p => p - 1)}>Anterior</button>
                        <i class="left fa-solid fa-arrow-left"></i>
                        <span className="pagina">Página {pagina}</span>
                        <i class="right fa-solid fa-arrow-right"></i>
                        <button className="siguiente" onClick={() => setPagina(p => p + 1)}>Siguiente</button>
                   </div>
            </main>
        </>
    );
}