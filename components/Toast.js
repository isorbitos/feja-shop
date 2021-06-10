const Toast = ({msg, handleShow, bgColor})=> {
return(
    <div className={`toast align-items-center position-fixed show ${bgColor}`}
        style={{top:'5px', right:'5px', zIndex:9, minWidth:'280px'}}
        role="alert"
        aria-live="assertive"
        aria-atomic="true">
        <div className="d-flex">
            <div className="toast-body">
                <h5>{msg.title}</h5>
                <p>{msg.msg}</p>
            </div>
            <button type="button" className="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close" onClick={handleShow}></button>
        </div>
    </div>
)
}

export default Toast;
