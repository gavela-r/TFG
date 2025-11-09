import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';


export function Buscador(){
    const navigate = useNavigate();
    const [buscador, setBuscador] = useState("");

    useEffect(() =>{
        localStorage.setItem('buscador', buscador);
    }, [buscador]);

    function buscar(e){
        e.preventDefault();
        let url = `/juegos?nombre=${buscador}`;

        fetch(url, {
            method: 'GET',
            headers:{
                "Content-Type": "application/json",
            }
        })
        .then(res => {
            if(res.ok){
                return res.json();
            }else{
                throw new Error("Error en la peticion");
            }
        })
        .then(data =>{
            console.log(data.results);
            navigate('/juegosFiltradosBuscador', {state: {resultados: data.results}});
        })    
    }
    

    return (
        <>
            <div className='formulario'>
                <form action="" method='post'>
                    <input type="text" id='buscar' className='buscar' placeholder='Busca tu Juego Preferido' value={buscador} onChange={(e) => setBuscador(e.target.value)}/>
                    <button type='button' id='btnBuscar' className='btnBuscar' onClick={buscar}><i className="fa-solid fa-magnifying-glass"></i></button>
                </form>
            </div>
        </>
    );
}