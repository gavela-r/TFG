import { useState } from 'react';
import '../css/registro.css';
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const contrasenaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{8,}$/;
const dniNifRegex = /^([XYZ]|[A-HJUVNPQRSW])?\d{7,8}[A-Z]$/;

function validar(email, contrasena, confirmContrasena, dni){
    if(!emailRegex.test(email)){
        alert("El correo no cumple las credenciales, las credenciales son las siguientes:\n- Debe contener un '@' y un dominio válido.");
        return false;
    }

    if(!contrasenaRegex.test(contrasena)){
        alert("La contraseña no cumple las credenciales, las credenciales son las siguientes:\n- Mínimo 8 caracteres.\n- Al menos una letra mayúscula.\n- Al menos una letra minúscula.\n- Al menos un número.\n- Al menos un carácter especial (@$!%*?&_).");
        return false;
    }

    if(contrasena != confirmContrasena){
        alert("La contraseña no coincide");
        return false;
    }

    if(!dniNifRegex.test(dni)){
        alert("El DNI o NIF no cumple las credenciales, las credenciales son las siguientes:\n- Formato válido: 12345678A o X1234567B.");
        return false;
    }

    return true;
}

export function EditarPerfil(){
    const userName = localStorage.getItem('nombre');
    const correo = localStorage.getItem("correo");
    const dni = localStorage.getItem("dni");
    const [dataUser, setDataUser] = useState({
        nombre: "",
        correo: "",
        pass: "",
        confirmPass: "",
        dni: "",
        fecha: ""
    });

   
    function handleChange(e){
        const {name, value} = e.target;
        
        setDataUser(prev =>({
            ...prev,
            [name]: value,
        }))
    }
    
    function dataFormulario(e){
        e.preventDefault();

        if(!validar(dataUser.correo, dataUser.pass, dataUser.confirmPass, dataUser.dni)){
            return;
        }

        fetch("userios/editar",{
            method: "POST",
            headers: {
                "Content-Type": "Application/json",
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(dataUser),
        })
        .then(res =>{
            if(res.ok){
                return res.json();
            }else{
                throw new Error("Error en la peticion");
            }
        })
        .then(data =>{
            if(data.status == 200){
                alert("El usuario se a modificado correctamente");
            }else{
                alert("No se pudo modificar el usuario");
            }
        })
    }
    return (
        <div className="editarPerfil">
            <h1 className="tituloUnete">Edita tu Perfil</h1>
            <form action="" method="post" onSubmit={dataFormulario}>
                <label htmlFor="nombre" className="nombre">Nombre de usuario</label>
                <input type="text" name="nombre" id="nombre" value={userName} onChange={handleChange}/>
                <label htmlFor="correo" className="correo">Correo electronico</label>
                <input type="email" name="correo" id="correo" value={correo} onChange={handleChange}/>
                <label htmlFor="pass" className="pass">Cambiar contraseña</label>
                <input type="password" name="pass" id="pass" onChange={handleChange}/>
                <label htmlFor="pass" className="pass">Confirmar Contraseña</label>
                <input type="password" name="confirmPass" id="confirmPass" onChange={handleChange}/>
                <label htmlFor="dni" className="dni">DNI o NIF</label>
                <input type="text" name="dni" id="dni" value={dni} onChange={handleChange}/>
                <label htmlFor="fecha" className="fecha">Fecha de nacimiento</label>
                <input type="date" name="fecha" id="fecha" onChange={handleChange}/>
                <input type="submit" value="Crear cuenta" name="enviar" className="botonRegistro"/>
            </form>
        </div>
    )
}