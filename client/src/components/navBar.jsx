import { useNavigate } from "react-router-dom";
import "../css/navBar.css";
import { useEffect } from "react";
import { Offcanvas } from 'bootstrap';

export function NavBar(){
    const userName = localStorage.getItem('nombre');
    const navigate = useNavigate();

    useEffect(() => {
        const offcanvasElement = document.getElementById("offcanvasRight");
        if (offcanvasElement) {
            new Offcanvas(offcanvasElement, {
                backdrop: "static",
                keyboard: false,
            });
        }
    }, []);
    
    function closeOffcanvas(){
        const offcanvasElement = document.getElementById("offcanvasRight");
        const offCanvasInstance = Offcanvas.getInstance(offcanvasElement);
        if(offCanvasInstance){
            offCanvasInstance.hide();
        }
        
        setTimeout(() => {
            document.body.classList.remove("offcanvas-backdrop", "modal-open");
            document.body.style.overflow = "";
            document.body.style.paddingRight = "";
            const backdrop = document.querySelector(".offcanvas-backdrop");
            if (backdrop) backdrop.remove();
        }, 0);
    }
    
    
    
    function linkPerfil(){
        closeOffcanvas();
        navigate("/editarPerfil");
    }

    function linkFavoritos(){
        closeOffcanvas();
        navigate("/favoritos");
    }

    function linkCarrito(){
        closeOffcanvas();
        navigate("/compra");
    }


    return (
        <>
            <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                <div className="offcanvas-header">
                    <h1 className="offcanvas-title" id="offcanvasRightLabel">{userName}</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <hr />
                <div className="offcanvas-body">
                    <ul className="lista">
                        <li onClick={linkPerfil}><h5><i class="fa-solid fa-user"></i> Mis Datos Personales</h5></li>
                        <li onClick={linkCarrito}><h5><i className="icon fa-solid fa-cart-shopping" id="carrito"></i>Carrito</h5></li>
                        <li><h5><i className="icon fa-solid fa-wallet"></i>Fondos</h5></li>
                        <li onClick={linkFavoritos}><h5><i className="icon fa-solid fa-heart"></i>Favoritos</h5></li>
                    </ul>
                </div>
            </div>
        </>
    )
}