import '../css/header.css';
import { Link, useNavigate } from 'react-router-dom';
import { ModalCategorias } from './modalCategoria';
import { useState } from 'react';


export function Header(){
    const userName = localStorage.getItem("nombre");
    const navigate = useNavigate();
    const [modal, setModal] = useState(false);
    const logOut = () =>{
        localStorage.removeItem("token");
        localStorage.removeItem("nombre");
        localStorage.removeItem('rol');
        navigate("/");
    }

    function abrirModal(){
        setModal(true);
    }

    function cerrarModal(){
        setModal(false);
    }
    

    return (
        <>
        <header>
        {!userName ? (
            <Link to="/"><h1 className="cabecera">GameShop</h1></Link>

        ) : (
            <Link to="/principal"><h1 className="cabecera">GameShop</h1></Link>
        )}
        <nav>
            {!userName ? (
                <Link to={"/"}>Inicio</Link>
            ) : (
                <Link to={"/principal"}>Inicio</Link>
            )}
            {modal ? (
                <a className='categorias'onClick={cerrarModal}>Categoria</a>

            ) : (
                <a className='categorias' onClick={abrirModal}>Categoria</a>
            )}
            <a className='ofertas' href="">Ofertas</a>
            <a className='contactos' href="">Contactos</a>
            
        </nav>
        {!userName ? (
            <>
                <i className="fa-solid fa-cart-shopping carrito"></i>
                <div className="botones" >
                    <Link to='/login' className='login'>Iniciar Sesion</Link>
                </div>
                <div className="botones">
                    <Link to='/registrarse' className='registrarse'>Registrarse</Link>
                </div>
            </>

        ) : (
            <>
                <div className='username'>
                    <span className='name'>{userName}</span>
                    <i class="fa-solid fa-cart-shopping carrito"></i>
                </div>
                <a onClick={logOut} className='botones'>Cerrar Sesion</a>
            </>
        )}
        
    </header>
        {modal && <ModalCategorias cerrarModal={cerrarModal} />}
        </>
    );
}