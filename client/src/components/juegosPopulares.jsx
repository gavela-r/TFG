import { useState, useEffect } from "react";
import { ModalLoading } from "./modalLoading";
import { useContext } from "react";
import { CarritoContext } from "../../context/CarritoContext";

export function JuegosPopulares () {
    const key = "cd78ce15613642a1927ebec76a306421";
    const [todosLosJuegos, setTodosLosJuegos ] = useState([]);
    const [juegosVisibles, setJuegosVisibles] = useState([]);
    const [loading, setLoading] = useState(true);
    const {agregarAlCarrito} = useContext(CarritoContext);
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
        const option = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        }

        let url = `https://api.rawg.io/api/games?key=${key}`;
        let paginas = 0;
        let acumulado = [];

        function cargarPagina(urlActual){
            if(paginas >= 10 || !urlActual){
                setTodosLosJuegos(acumulado);
                setJuegosVisibles(juegosAleatorios(acumulado));
                setLoading(false);
                return;
            }
            fetch(urlActual, option)
            .then(res =>{
                if(!res.ok){
                    throw new Error("Fallo en la peticion");
                }else{
                    return res.json();
                }
            })
            .then(data =>{
                acumulado = [...acumulado, ...data.results];
                paginas++;
                cargarPagina(data.next);
            })
            .catch(err =>{
                setLoading(false);
            })
        }
        cargarPagina(url)
    }

    useEffect(() =>{
        juegos()
    }, []);

    useEffect(() =>{
        const interval = setInterval(()=>{
            if(todosLosJuegos.length > 0){
                setJuegosVisibles(juegosAleatorios(todosLosJuegos))
            }
        }, 300000)
        return() => clearInterval(interval);
    })

    
    return (
        <>
            <ModalLoading show={loading}/>
            <h1 className="populares">Juegos Populares</h1>
            <div className="juegos">
                {juegosVisibles.slice(0, jueogPerPage).map((juego, index) =>(
                    <div key={index} className='juego'>
                        <img src={juego.background_image} alt={juego.name} className="fotoJuego"/>
                        <div className="descripcion">
                            <h2>{juego.name}</h2>
                            <p>{juego.released}</p>
                        </div>
                        <div className="boton" onClick={() => agregarAlCarrito({
                            nombre: juego.name,
                            fecha: juego.released,
                            imagen: juego.background_image,
                        })}>Comprar</div>
                    </div>
                ))}
            </div>
        </>
    )
}