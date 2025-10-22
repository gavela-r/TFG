import { useLocation } from "react-router-dom";
import '../css/main.css';
import { Buscador } from "../components/buscador";


export function JuegosFiltrados(){
    const location = useLocation();
    const resultados = location.state?.resultados || [];
    
    return (
        <>
            <Buscador />
            <main>
                <div className="juegos">
                    {resultados.map((juego, index) =>(
                        <div key={index} className='juego'>
                            <img src={juego.background_image} alt={juego.name} />
                            <div className="descripcion">
                                <h2>{juego.name}</h2>
                                <p>{juego.released}</p>
                            </div>
                            <div className="boton">Comprar</div>
                        </div>
                    ))}
                </div>
            </main>
        </>
    );
}