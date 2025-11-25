import { useContext } from "react";
import { CarritoContext } from "../../context/CarritoContext";
import "../css/cestaFinal.css";
export function Compra(){
    const {carrito, eliminarDelCarrito, agregarAlCarrito} = useContext(CarritoContext);

    return(
        <>
            <h1>Tu cesta de la compra</h1>
            <div className="titulos">
                <p className="articulos">Tu cesta tiene {carrito.length} articulos</p>
                <p className="precioTitulo">Precio:</p>
                <p className="accionesTitulo">Acciones:</p>
            </div>
            <div className="carritoFinal">
                <div className="productoFinal">
                <hr />
                    {carrito.map((juego, index) =>(
                        <div key={index} className="productoCarrito">
                            <img src={juego.imagen} alt={juego.nombre} className="imagen"/>
                            <div className="datosJuego">
                                <div className="datos">
                                    <h2>{juego.nombre}</h2>
                                    <p className="fechaFinal">{juego.fecha}</p>
                                </div>
                                <div className="precio">
                                    <p>{juego.precio}€</p>  
                                </div>
                            </div>
                            <div className="acciones">
                                <i className="fa-solid fa-trash basura" onClick={() => eliminarDelCarrito(juego.nombre)}></i>
                                <div className="añadirEliminar">
                                    <button className="menos" onClick={() => eliminarDelCarrito(juego.nombre)}><i class="fa-solid fa-minus"></i></button>
                                    <p className="contador">{juego.cantidad}</p>
                                    <button className="mas" onClick={() => agregarAlCarrito({nombre: juego.nombre,
                                        fecha: new Date(juego.fecha_lanzamiento).toLocaleDateString('es-ES'),
                                        imagen: juego.foto,
                                        precio: juego.precio,})}><i class="fa-solid fa-plus"></i></button>
                                </div>
                            </div>
                        </div>
                    ))}  
                </div>
                <div className="pagar">
                    <h2>Total a parcial: {carrito.reduce((total, juego) => total + (juego.precio * juego.cantidad), 0)}€</h2>
                    <h1>Total : {carrito.reduce((total, juego) => total + (juego.precio * juego.cantidad), 0)}€</h1>
                    <button className="btnPagar">Finalizar Pedido</button>
                </div>
            </div>
        </>
    );
}