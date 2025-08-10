import { useState } from 'react';
import '../css/registro.css';
import { useNavigate } from 'react-router-dom';


export function Registro(){
    const navigate = useNavigate();
    const [dataUser, setDataUser] = useState({
        correo: "",
        pass: "",
        fecha: "",
        plataforma: "",
        terminos: false,
    })

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const fieldValue = type === "checkbox" ? checked : value;
        
        setDataUser(prev => ({
            ...prev,
            [name]: fieldValue
        }));
    };

    
    const dataFormulario = (e) =>{
        e.preventDefault();
        const options = {
            method: 'POST',            
            headers: {
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify(dataUser)
        }
        fetch('user/registro', options)
        .then(res =>{
            if(!res.ok){
                throw new Error("error en la peticion")
            }else{
                return res.json();
            }
        })
        .then(data =>{
            navigate('/login');
        })
        .catch(err =>{
            console.log( "error:", err);
        })
    }
    
    return (
        <div className="registro">
            <h1 className="titulo">Únete a GameShop</h1>
            <p>Crea tu cuenta para acceder a ofertas exclusivas y mas</p>
            <form action="" method="post" onSubmit={dataFormulario}>
                <label htmlFor="nombre" className="nombre">Nombre de usuario</label>
                <input type="text" name="nombre" id="nombre" placeholder="CoolGamer123" onChange={handleChange}/>
                <label htmlFor="correo" className="correo">Correo electronico</label>
                <input type="email" name="correo" id="correo" placeholder="ejemplo@gmail.com" onChange={handleChange}/>
                <label htmlFor="pass" className="pass">Contraseña</label>
                <input type="password" name="pass" id="pass" onChange={handleChange}/>
                <label htmlFor="fecha" className="fecha">Fecha de nacimiento</label>
                <input type="date" name="fecha" id="fecha" onChange={handleChange}/>
                <label htmlFor="plataforma" className="plataforma">Plataforma favorita</label>
                <select name="plataforma" id="plataforma" onChange={handleChange}> 
                    <option value="pc">PC</option>
                    <option value="play">PlayStation</option>
                    <option value="xbox">Xbox</option>
                    <option value="nintendo">Nintendo</option>
                    <option value="movil">Movile</option>
                </select>
                <input type="checkbox" name="terminos" id="terminos" onChange={handleChange}/>
                <label htmlFor="terminos" className="terminos">Acepto los términos y condiciones</label><br />
                <input type="submit" value="Crear cuenta" name="enviar" className="boton"/>
            </form>
        </div>
    )
}