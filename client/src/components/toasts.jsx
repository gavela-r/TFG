import { Toast } from "bootstrap/dist/js/bootstrap.bundle.min";
import { useEffect, useRef } from "react"
import { useSearchParams } from "react-router-dom";

export function ToastMessage({show, message, type = "succes", onClose}){
    const toastRef = useRef(false);

    useEffect(() => {
        if (!show || !toastRef.current) return;

        const bsToast = new Toast(toastRef.current, { delay: 3000 });
        bsToast.show();

        const timeout = setTimeout(() => {
            bsToast.hide();
            if (onClose) onClose();
        }, 3000);

        return () => clearTimeout(timeout);
    }, [show]);

    return(
        <div 
            className={`toast align-items-center text-bg-${type} border-0 position-fixed bottom-0 end-0 m-3`}
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
            ref={toastRef}
            onHidden={onClose}
        >
        <div className="d-flex">
            <div className="toast-body">{message}</div>
                <button
                type="button"
                className="btn-close btn-close-white me-2 m-auto"
                data-bs-dismiss="toast"
                aria-label="Close"
                ></button>
            </div>
        </div>
    )
}