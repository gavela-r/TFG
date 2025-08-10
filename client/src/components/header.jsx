import '../css/header.css';
import { Link, useNavigate } from 'react-router-dom';
import { Modal } from './modalCategoria';
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
                <a onClick={cerrarModal}>Categoria</a>

            ) : (
                <a onClick={abrirModal}>Categoria</a>
            )}
            <a href="">Ofertas</a>
            <a href="">Contactos</a>
        </nav>
        {!userName ? (
            <>
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
                </div>
                <a onClick={logOut} className='botones'>Cerrar Sesion</a>
            </>
        )}
        
    </header>
        {modal && <Modal cerrarModal={cerrarModal} />}
        </>
    );
}