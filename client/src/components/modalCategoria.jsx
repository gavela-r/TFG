import { use, useEffect, useRef, useState } from "react"
import {Modal as BootstrapModal } from 'bootstrap'
import "../css/modal.css"
import { useNavigate } from "react-router-dom";
export function ModalCategorias({cerrarModal}){
    const modalRef = useRef(null);
    const instanceRef = useRef(null);
    const navigate = useNavigate();
    const key = "cd78ce15613642a1927ebec76a306421";
    const [categorias, setCategorias] = useState([]);
    let url = `https://api.rawg.io/api/genres?key=${key}`;
    
   

    useEffect(() => {
        if (modalRef.current) {
            const modalElement = modalRef.current;
            const modalInstance = new BootstrapModal(modalElement, {
                backdrop: true,
                keyboard: true,
            });

            instanceRef.current = modalInstance;

            const handleHidden = () => cerrarModal();
            modalElement.addEventListener("hidden.bs.modal", handleHidden);

            return () => {
                modalElement.removeEventListener("hidden.bs.modal", handleHidden);
                modalInstance.hide();
            };
        }
    }, [cerrarModal]);

    useEffect(() =>{
        if(instanceRef.current){
            instanceRef.current.show();
        }
    }, [])

    useEffect(() =>{
        localStorage.setItem('categorias', JSON.stringify(categorias));
    },[categorias])

    useEffect(() =>{
        fetch(url, {
            method: "GET",
            headers: {
                "Content-type": "Application/json"
            },
        })
        .then(res =>{
            if(res.ok){
                return res.json();
            }else{
                throw new Error("No se pudo obtener la categorias");
            }
        })
        .then(data =>{
            setCategorias(data.results);
            
        })
    }, [])

    function handleClick(slug){
        instanceRef.current.hide();
        setTimeout(() => {
            const backdrop = document.querySelector('.modal-backdrop');
            if (backdrop) backdrop.remove();
            navigate("/juegosFiltrados", { state: { genero: slug } });
        }, 300);
    }
    
    return(
        <>
            <div className="modal fade" ref={modalRef} id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Categorias</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <ul className="list-group">
                                {categorias.map(cat =>(
                                 <li className="listaCategorias" key={cat.id} onClick={() => handleClick(cat.slug)}>{cat.name}</li>

                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}