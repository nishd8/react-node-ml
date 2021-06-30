const GlassInput = (props) =>{
    return(
        <div className="input-div">
            <div className="input-lb">{props.inputLabel}</div>
            <input className="input-glass" type={props.inputType} placeholder={props.placeHolder} onChange={props.handleChange}/>
        </div>
    )
}

export default GlassInput