
import '../css/main.css'
import { Buscador } from './buscador'
import { JuegosPopulares } from './juegosPopulares'
import { ToastMessage } from './toasts'
import { useState, useEffect } from 'react'

export function Main() {
    const [toast, setToast] = useState({ show: false, message: "", type: "success" });

    useEffect(() => {
        const message = localStorage.getItem("toastMessage");
        const type = localStorage.getItem("toastType");

        if (message) {
            setToast({ show: true, message, type: type || "success" });
            localStorage.removeItem("toastMessage");
            localStorage.removeItem("toastType");
        }
        
    }, []);

    return (
        <>
            <div>

                <Buscador />
            </div>
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
            <ToastMessage
                show={toast.show}
                message={toast.message}
                type={toast.type}
                onClose={() => setToast({ ...toast, show: false })}
            />

        </>
    )
}