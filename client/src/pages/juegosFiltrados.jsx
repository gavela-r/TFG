import { useLocation } from "react-router-dom";
import '../css/main.css';
import { Buscador } from "../components/buscador";
import { useState, useEffect, useContext } from "react";
import { CarritoContext } from "../../context/CarritoContext";


export function JuegosFiltrados(){
    const location = useLocation();
    const resultados = location.state?.resultados || [];
    const genero = location.state?.genero || [];
    const [categorias, setCategoria] = useState([]);
    const {agregarAlCarrito} = useContext(CarritoContext);
    const key = 'cd78ce15613642a1927ebec76a306421';
    let url =  `https://api.rawg.io/api/games?key=${key}&genres=${genero}`;
    

    useEffect(() =>{
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
    },[resultados])
    return (
        <>
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
            </main>
        </>
    );
}