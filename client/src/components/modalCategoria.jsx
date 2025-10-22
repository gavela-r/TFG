import { useEffect, useRef } from "react"
import {Modal as BootstrapModal } from 'bootstrap'
import "../css/modal.css"
export function ModalCategorias({cerrarModal}){
    const modalRef = useRef(null);
    const instanceRef = useRef(null);

   useEffect(() => {
        if (modalRef.current) {
            const modalElement = modalRef.current;
            const modalInstance = new BootstrapModal(modalElement, {
                backdrop: true,
                keyboard: true,
            });

            instanceRef.current = new BootstrapModal(modalRef.current, {
                backdrop: true,
                keyboard: true,
            });
            instanceRef.current.show();

            const handleHidden = () => cerrarModal();
            modalRef.current.addEventListener("hidden.bs.modal", handleHidden);

            return () => {
                modalElement.removeEventListener("hidden.bs.modal", handleHidden);
                modalInstance.hide();

            };
        }
    }, [cerrarModal]);


    return(
        <>
            <div class="modal fade" ref={modalRef} id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Categorias</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <ul className="list-group">
                                <a href=""><li className="list-group-item">Rol</li></a>
                                 <a href=""><li className="list-group-item">Deportes</li></a>
                                 <a href=""><li className="list-group-item">Aventuras</li></a>
                                 <a href=""><li className="list-group-item">Militares</li></a>
                                 <a href=""><li className="list-group-item">Estrategia</li></a>
                                 <a href=""><li className="list-group-item">Supervivencia</li></a>
                                 <a href=""><li className="list-group-item">Lucha</li></a>
                                 <a href=""><li className="list-group-item">Terror</li></a>
                                 <a href=""><li className="list-group-item">Ciencia Ficción</li></a>
                                 <a href=""><li className="list-group-item">Simulación</li></a>
                                 <a href=""><li className="list-group-item">Sandbox</li></a>
                                 <a href=""><li className="list-group-item">Plataformas</li></a>
                                 <a href=""><li className="list-group-item">Roguelike</li></a>
                                 <a href=""><li className="list-group-item">MMORPG</li></a>
                                 <a href=""><li className="list-group-item">Casual</li></a>
                                 <a href=""><li className="list-group-item">Musical</li></a>
                                 <a href=""><li className="list-group-item">Puzzle</li></a>
                                 <a href=""><li className="list-group-item">Metroidvania</li></a>
                                 <a href=""><li className="list-group-item">Battle Royale</li></a>
                            </ul>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                            <button type="button" class="btn btn-primary">Guardar Cambios</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}