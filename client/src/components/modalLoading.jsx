export function ModalLoading({show}) {
    if(!show){
        return null;
    }
    return (
        <div className="modal show d-block" tabIndex={-1} aria-hidden="true"  style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content bg-transparent border-0 shadow-none">
                    <div className="modal-body d-flex justify-content-center align-items-center">
                        <div className="spinner-border text-light" role="status">
                            <span className="visually-hidden">Cargando...</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}