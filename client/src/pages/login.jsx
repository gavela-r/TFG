import { Link, useNavigate } from 'react-router-dom'
import '../css/login.css'
import { useState } from 'react'

const saveLocalStorage = (token, nombre, rol, correo, dni) =>{
    localStorage.setItem("token", token);
    localStorage.setItem("nombre", nombre);
    localStorage.setItem("rol", rol);
    localStorage.setItem("dni", dni)
    localStorage.setItem("correo", correo);
        
}

export function Login(){
    const navigate = useNavigate()
    const [loginData, setLoginData] = useState({
           correo: "",
    });
    const [toast, setToast] = useState({show: false, message: "", type: "success"});
    

    const handleChange = (e) =>{
        const {name, value, type } = e.target;
        const fielValue = type === null ? null : value;

        setLoginData(prev => ({
            ...prev,
            [name]: fielValue,
        }));
    }
    
    const loginFormulario = (e) => {
        
        e.preventDefault();

        const option = {
            method: "POST",
            headers: {
                "Content-Type": 'Application/json'
            },
            body: JSON.stringify(loginData)
        }

        fetch("userios", option)
        .then(res => {
            if(res.ok){
                return res.json();
            }else{
                throw new Error("Error en la peticion");
            }
        })

        .then(data =>{
            saveLocalStorage(data.token, data.user, data.rol, data.correo, data.dni);
            localStorage.setItem("toastMessage", "Inicio de sesión exitoso");
            localStorage.setItem("toastType", "success");
            navigate("/principal");
        })
    }


    return (
         <div className="iniciar_sesion">
            <h1>Iniciar Sesión</h1>
            <form action="" onSubmit={loginFormulario}>
                <p className="electronico">Correo Electronico</p>
                <input type="text" className="correo" name="correo" placeholder="Ingresa tu correo" onChange={handleChange}/>
                <p className="contraseña">Contraseña</p>
                <input type="password" clasname="pass" name='pass' id="contraseña" placeholder="Ingresa tu contraseña" onChange={handleChange}/>
                <input type="submit" value="Iniciar Sesion" name="boton" className="btnLogin"/>
            </form>
            <div className='register'>
                <p className='noCuenta'>¿No tienes cuenta?</p><Link to='/registrarse' className='registrarse'>Registrate</Link>
            </div>
        </div>
        
    )
}