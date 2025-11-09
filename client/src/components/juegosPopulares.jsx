import { useState, useEffect } from "react";
import { ModalLoading } from "./modalLoading";
import { useContext } from "react";
import { CarritoContext } from "../../context/CarritoContext";
import { FavoritosContext } from "../../context/FavoritosContext";

export function JuegosPopulares () {
    const [todosLosJuegos, setTodosLosJuegos ] = useState([]);
    const [juegosVisibles, setJuegosVisibles] = useState([]);
    const [loading, setLoading] = useState(true);
    const {agregarAlCarrito} = useContext(CarritoContext);
    const {favoritos, añadirFavoritos, eliminarFavoritos} = useContext(FavoritosContext)
    const jueogPerPage = 5;
    
    function juegosAleatorios(juegos){
        const copia = [...juegos];
        const seleccionados = [];
        while(seleccionados.length < jueogPerPage && copia.length > 0){
            const index = Math.floor(Math.random() * copia.length);
            seleccionados.push(copia.splice(index, 1)[0])
        }
        return seleccionados
    }

    function juegos(){
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        };

        fetch("/juegos", options)
        .then(res =>{
            if(!res.ok){
                throw new Error("Fallo en la peticion");
            }else{
                return res.json();
            }
        })
        .then(data =>{
            console.log(data);
            setTodosLosJuegos(data.results);
            setJuegosVisibles(juegosAleatorios(data.results));
            setLoading(false);
        })
        .catch(err =>{
            console.log("Error en la carga de juegos", err.message);
            setLoading(false);
        })
    }

    useEffect(() =>{
        juegos();
    }, [])

    useEffect(() =>{
        const interval = setInterval(() =>{
            if(todosLosJuegos.length > 0){
                setJuegosVisibles(juegosAleatorios(todosLosJuegos));
            }
        }, 300000)
        return () => clearInterval(interval)
    }, [todosLosJuegos]) 
    
    function favorito(juego){
        const yaEsFavorito = favoritos.find(f => f.id === juego.id);

        if(yaEsFavorito){
            eliminarFavoritos(juego.id)
        }else{
            añadirFavoritos({
                id: juego.id,
                nombre: juego.nombre,
                foto: juego.foto, 
                fecha: juego.fecha_lanzamiento
            })
        }
    }
        console.log(favoritos);
    return (
        <>
            <ModalLoading show={loading}/>
            <h1 className="populares">Juegos Populares</h1>
            <div className="juegos">
                {juegosVisibles.slice(0, jueogPerPage).map((juego, index) =>(
                    <div key={index} className='juego'>
                        <i className={`fa-solid fa-heart corazon ${favoritos.find(f => f.id === juego.id) ? "activo" : ''}`} onClick={() => favorito(juego)}></i>
                        <img src={juego.foto} alt={juego.nombre} className="fotoJuego"/>
                        <div className="descripcion">
                            <h2>{juego.nombre}</h2>
                            <p>{new Date(juego.fecha).toLocaleDateString('es-ES')}</p>
                        </div>
                        <div className="boton" onClick={() => agregarAlCarrito({
                            nombre: juego.nombre,
                            fecha: new Date(juego.fecha_lanzamiento).toLocaleDateString('es-ES'),
                            imagen: juego.foto,
                            precio: juego.precio,
                        })}>Comprar</div>
                    </div>
                ))}
            </div>
        </>
    )
}