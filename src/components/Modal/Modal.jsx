import './index.css'

function Modal ({ children }) {

    return (
        <div className="modal__layout">
            <div className="modal__main__layout" ></div>
            {children}
        </div>
    );
};

export default Modal;