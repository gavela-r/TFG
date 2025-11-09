import { useContext, useState } from "react";
import { FavoritosContext } from "../../context/FavoritosContext";
import { CarritoContext } from "../../context/CarritoContext";

export function Favoritos() {
    const { favoritos, eliminarFavoritos } = useContext(FavoritosContext);
    const { agregarAlCarrito } = useContext(CarritoContext);
    const [pagina, setPagina] = useState(1);
    const juegosPerPage = 10;

    const juegosMostrados = favoritos.slice(
        (pagina - 1) * juegosPerPage,
        pagina * juegosPerPage
    );

    function toggleFavorito(juego) {
        eliminarFavoritos(juego.id);
    }

    return (
        <>
            <h1 className="populares">Tus Juegos Favoritos</h1>
            <div className="juegos">
                {juegosMostrados.length === 0 ? (
                    <h5>No tienes juegos favoritos</h5>
                ) : (
                    juegosMostrados.map((juego, index) => (
                        <div key={index} className="juego">
                            <i className={`fa-solid fa-heart corazon activo`} onClick={() => toggleFavorito(juego)}></i>
                            <img src={juego.foto} alt={juego.nombre} className="fotoJuego" />
                            <div className="descripcion">
                                <h2>{juego.nombre}</h2>
                                <p>{new Date(juego.fecha).toLocaleDateString('es-ES')}</p>
                            </div>
                            <div className="boton" onClick={() =>
                                    agregarAlCarrito({
                                        nombre: juego.nombre,
                                        fecha: new Date(juego.fecha_lanzamiento).toLocaleDateString('es-ES'),
                                        imagen: juego.foto,
                                        precio: juego.precio,
                                    })
                                }
                            >
                                Comprar
                            </div>
                        </div>
                    ))
                )}
            </div>

            {favoritos.length > juegosPerPage && (
                <div className="paginacion">
                    <button className="anterior" disabled={pagina === 1} onClick={() => setPagina(p => p - 1)}>
                        Anterior
                    </button>
                    <i className="left fa-solid fa-arrow-left"></i>
                    <span className="pagina">Página {pagina}</span>
                    <i className="right fa-solid fa-arrow-right"></i>
                    <button className="siguiente" disabled={pagina * juegosPerPage >= favoritos.length} onClick={() => setPagina(p => p + 1)}>
                        Siguiente
                    </button>
                </div>
            )}
        </>
    );
}