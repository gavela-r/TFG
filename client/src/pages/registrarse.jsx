import { useState } from 'react';
import '../css/registro.css';
import { useNavigate } from 'react-router-dom';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const contrasenaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{8,}$/;
const dniNifRegex = /^([XYZ]|[A-HJUVNPQRSW])?\d{7,8}[A-Z]$/;

function validar(email, contraseña, dni){
    if(!emailRegex.test(email)){
        alert("El correo no cumple las credenciales, las credenciales son las siguientes:\n- Debe contener un '@' y un dominio válido.");
        return false;
    }

    if(!contrasenaRegex.test(contraseña)){
        alert("La contraseña no cumple las credenciales, las credenciales son las siguientes:\n- Mínimo 8 caracteres.\n- Al menos una letra mayúscula.\n- Al menos una letra minúscula.\n- Al menos un número.\n- Al menos un carácter especial (@$!%*?&_).");
        return false;
    }

    if(!dniNifRegex.test(dni)){
        alert("El DNI o NIF no cumple las credenciales, las credenciales son las siguientes:\n- Formato válido: 12345678A o X1234567B.");
        return false;
    }

}

export function Registro(){
    const navigate = useNavigate();
    const [dataUser, setDataUser] = useState({
        nombre: "",
        correo: "",
        pass: "",
        dni: "",
        fecha: "",

    })

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setDataUser(prev => ({
            ...prev,
            [name]: value
        }));
        
    };

    
    const dataFormulario = (e) =>{
        e.preventDefault();

        if(validar(dataUser.correo, dataUser.pass, dataUser.dni)){
            return;
        }

        const options = {
            method: 'POST',            
            headers: {
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify(dataUser)
        }
        fetch('userios/registro', options)
        .then(res =>{
            if(!res.ok){
                localStorage.setItem("toastMessage", "No se pudo registrar al usuario");
                localStorage.setItem("type", "danger");
                throw new Error("error en la peticion")
            }else{
                return res.json();
            }
        })
        .then(data =>{
            localStorage.setItem("toastMessage", "Usuario registrado correctamente");
            localStorage.setItem("type", "success");
            navigate('/login');
        })
        .catch(err =>{
            console.log( "error:", err);
        })
    }
    
    return (
        <div className="registro">
            <h1 className="tituloUnete">Únete a GameShop</h1>
            <p className='subTitulo'>Crea tu cuenta para acceder a ofertas exclusivas y mas</p>
            <form action="" method="post" onSubmit={dataFormulario}>
                <label htmlFor="nombre" className="nombre">Nombre de usuario</label>
                <input type="text" name="nombre" id="nombre" placeholder="CoolGamer123" onChange={handleChange}/>
                <label htmlFor="correo" className="correo">Correo electronico</label>
                <input type="email" name="correo" id="correo" placeholder="ejemplo@gmail.com" onChange={handleChange}/>
                <label htmlFor="pass" className="pass">Contraseña</label>
                <input type="password" name="pass" id="pass" onChange={handleChange}/>
                <label htmlFor="dni" className="dni">DNI o NIF</label>
                <input type="text" name="dni" id="dni" onChange={handleChange}/>
                <label htmlFor="fecha" className="fecha">Fecha de nacimiento</label>
                <input type="date" name="fecha" id="fecha" onChange={handleChange}/>
                <input type="submit" value="Crear cuenta" name="enviar" className="botonRegistro"/>
            </form>
        </div>
    )
}