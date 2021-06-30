const Modal = (props) =>{
    return(
        <div className={ props.hide?"overlay hide":"overlay"}>
            <div className="message">
                <div className="message-header border-bottom">
                    Prediction
                </div> 
                <div className={props.color}>
                    {props.message}
                </div>
                <div className="text-right pt-2 border-top">
                    <button className="btn btn-glass" onClick={props.close}>Close</button>
                </div>
            </div>
        </div>
    )
}
export default Modal