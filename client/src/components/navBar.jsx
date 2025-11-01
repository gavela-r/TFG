import { useNavigate } from "react-router-dom";
import "../css/navBar.css";
export function NavBar(){
    const userName = localStorage.getItem('nombre');
    const navigate = useNavigate();
    
    function linkPerfil(){
        navigate("/editarPerfil");
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
                        <h5><li><i className="icon fa-solid fa-user"></i>Ver Perfil</li></h5>
                        <h5><li onClick={linkPerfil}><i className="icon fa-solid fa-pen-to-square"></i>Editar Perfil</li></h5>
                        <h5><li><i className="icon fa-solid fa-cart-shopping" id="carrito"></i>Pedidos</li></h5>
                        <h5><li><i className="icon fa-solid fa-wallet"></i>Fondos</li></h5>
                        <h5><li><i className="icon fa-solid fa-heart"></i>Favoritos</li></h5>
                    </ul>
                </div>
            </div>
        </>
    )
}