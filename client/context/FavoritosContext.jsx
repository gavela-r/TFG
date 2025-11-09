import { createContext, useState } from "react";

export const FavoritosContext = createContext();

export function FavoritosProvider({children}){
    const [favoritos, setFavoritos] = useState([]);

    function añadirFavoritos(juego){
        setFavoritos((prev) =>{
            const existe = prev.find((f) => f.id === juego.id);
            return existe ? prev.filter((f) => f.id !== juego.id) :
            [...prev, {id: juego.id, nombre: juego.nombre, foto: juego.foto, fecha: new Date(juego.fecha).toLocaleDateString('es-ES')}]
        })
    }

    function eliminarFavoritos(index){
        setFavoritos(prev => prev.filter((f) => f.id !== index))
    }

    return (
        <FavoritosContext.Provider value={{favoritos, añadirFavoritos, eliminarFavoritos}}>
            {children}
        </FavoritosContext.Provider>
    )
}