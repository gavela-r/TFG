import { createContext, useEffectEvent, useState } from "react";

export const CarritoContext = createContext();

export function CarritoProvider({children}){
    const [carrito, setCarrito] = useState([]);

    function agregarAlCarrito(producto){
        setCarrito(prev => {
            const index = prev.findIndex(p => p.nombre === producto.nombre);
            if(index !==  -1){
                const nuevoCarrito = [...prev];
                nuevoCarrito[index].cantidad += 1;
                nuevoCarrito[index].precio = nuevoCarrito[index].cantidad * producto.precio;
                return nuevoCarrito;
            }else{
                return [...prev, {...producto, cantidad: 1}];
            }
        });
    }


    function eliminarDelCarrito(nombre){
        setCarrito(prev => {
            const index = prev.findIndex(p => p.nombre === nombre);
            if(index !== -1){
                const nuevoCarrito = [...prev];
                if(nuevoCarrito[index].cantidad > 1){
                    nuevoCarrito[index].cantidad -= 1;
                    nuevoCarrito[index].precio = nuevoCarrito[index].cantidad * (nuevoCarrito[index].precio / (nuevoCarrito[index].cantidad + 1));
                    return nuevoCarrito;
                }else{
                    return nuevoCarrito.filter(p => p.nombre !== nombre);
                }
            }
            return prev;
        });
    }

    function vaciarCarrito(){
        setCarrito([]);
    }

   
    
    return(
        <CarritoContext.Provider value={{carrito, agregarAlCarrito, eliminarDelCarrito, vaciarCarrito}}>
            {children}
        </CarritoContext.Provider>
    );
}