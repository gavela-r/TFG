import { createContext, useEffectEvent, useState } from "react";

export const CarritoContext = createContext();

export function CarritoProvider({children}){
    const [carrito, setCarrito] = useState([]);

    function agregarAlCarrito(producto){
        setCarrito(prev => {
            const existe = prev.find(p => p.nombre === producto.nombre);
            return existe ? prev : [...prev, producto];
        });
    }

    function eliminarDelCarrito(index){
        console.log(index);
        setCarrito(prev => prev.filter((p)=>p.nombre != index));
    }

    function vaciarCarrito(){
        setCarrito([]);
    }

    useEffectEvent(() => {
        const guardado = localStorage.getItem("carrito");
            if (guardado) setCarrito(JSON.parse(guardado));
    }, []);

    useEffectEvent(() => {
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }, [carrito]);

    
    return(
        <CarritoContext.Provider value={{carrito, agregarAlCarrito, eliminarDelCarrito, vaciarCarrito}}>
            {children}
        </CarritoContext.Provider>
    );
}