import "../css/modal.css"
export function Modal({cerrarModal}){
    return(
        <>
            <div className="modalPrincipal">
                <h1>Generos</h1>
                <div className="modal">
                    <ul>
                        <li>Acción</li>
                        <li>Rol</li>
                        <li>Deportes</li>
                        <li>Aventuras</li>
                        <li>Militares</li>
                        <li>Estrategia</li>
                        <li>Supervivencia</li>
                        <li>Lucha</li>
                        <li>Terror</li>
                        <li>Ciencia Ficción</li>
                        <li>Simulación</li>
                        <li>Sandbox</li>
                        <li>Plataformas</li>
                        <li>Roguelike</li>
                        <li>MMORPG</li>
                        <li>Casual</li>
                        <li>Musical</li>
                        <li>Puzzle</li>
                        <li>Metroidvania</li>
                        <li>Battle Royale</li>
                    </ul>
                </div>
            </div>
        </>
    )
}