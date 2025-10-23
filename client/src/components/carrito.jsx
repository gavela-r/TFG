import '../css/carrito.css';
import { useContext } from 'react';
import { CarritoContext } from '../../context/CarritoContext';
export function Carrito(){
    const {carrito, eliminarDelCarrito} = useContext(CarritoContext);
    const total = carrito.reduce((acc, juego) => acc + juego.precio, 0)
    console.log(carrito)
    return(
        <>
            <div className="carritoModal">
                <div className="contenidoCarrito">
                   <p className='contador'>Hay {carrito.length} productos en el carrito</p>
                   <hr />
                   {carrito.map((juego, index) => (
                    <div key={index} className="productosCarrito">
                        <div className='juegoCarrito'>
                        <img src={juego.imagen} alt={juego.nombre} className='fotoCarrito' />
                        <div className='infoJuego'>
                            <h3 className='juegoNombre'>{juego.nombre}</h3>
                            <p className='fechaJuego'>{juego.fecha}</p>
                            <p className='precioCarrito'>{juego.precio}€</p>
                        </div>
                        <i className="fa-solid fa-trash basura" onClick={() => eliminarDelCarrito(index)}></i>
                        </div>
                    </div>
))}

                    </div>
                <div className='precio'>
                    <div className='totalJuego'>
                        <p className='totalParcial'>Total Parcial</p>
                        <p className='total'>Total</p>
                    </div>
                    <div className='cantidad'>
                        <p className='precioParcial'></p>
                        <p className='precioTotal'></p>
                    </div>
                </div>
                <form action="" meethod='post' className='formularioComprar'>
                    <input type="submit" value="Comprar" name='comprar' className='comprar'/>
                </form>
            </div>
        </>
    );
}