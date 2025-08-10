import { useEffect, useState } from 'react'
import '../css/main.css'
import { JuegosPopulares } from './juegosPopulares'

export function Main() {
    
    return (
        <>
            <main>
                <JuegosPopulares />
            </main>
            <aside>
                <h1 className="titulo">Categorias</h1>
                <div className="categoria">
                    <div className="accion">
                        <i className="fa-solid fa-gamepad" id="mando"></i>
                        Acción
                    </div>
                    <div className="estrategia">
                        <i className="fa-solid fa-puzzle-piece" id="puzle"></i>
                        Estrategia
                    </div>
                    <div className="deportes">
                        <i className="fa-solid fa-futbol" id="sport"></i>
                        Deportes
                    </div>
                    <div className="aventura">
                        <i className="fa-solid fa-rocket" id="cohete"></i>
                        Aventura
                    </div>
                </div>
            </aside>
        </>
    )
}