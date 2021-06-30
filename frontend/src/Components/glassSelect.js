/* eslint-disable */ 
import { useEffect, useState } from "react";

const GlassSelect = (props) =>{
    let selectDropDown = []
    const [dropdown,setDropdown] =useState([])
    const [placeHolder,setPlaceholder] = useState(props.placeHolder) 
    const [isHidden, setIsHidden] = useState(true)
    const selectData = (e) =>{
        setIsHidden(true)
        setPlaceholder(e)
        props.onSelect(e)
    }
    
    const generateDropDown = ()=>{
        props.selectOptions.forEach((element,i) => {
            selectDropDown.push(<div key={i} className="input-dropdown-option" onClick={()=>{selectData(element)}}>{element}</div>)
        });
        setDropdown(selectDropDown)
    }

    const filterDropdown = (e) =>{
        selectDropDown=[]        
        props.selectOptions.forEach((element,i) => {
            if(element.includes(e.target.value)){
                selectDropDown.push(<div key={i} className="input-dropdown-option" onClick={()=>{selectData(element)}}>{element}</div>)
            }
        });
        setDropdown(selectDropDown)
    }
    useEffect(()=>{
        generateDropDown()
    },[])

    return(
        <div className="input-div">
            <div className="input-lb">{props.inputLabel}</div>

            <div className="input-glass-select container-fluid pt-2 pb-2">
                <div className="row" onClick={()=>{setIsHidden(!isHidden)}}>
                    <div className="col-11 pr-0">{placeHolder}</div>
                    <div className="col-1 pl-0">&#x2304;</div>
                </div>
    
                <div className={isHidden? "hide" : "" }>
                    <input type="text" onChange={filterDropdown} className="search mt-2" placeholder="Search"/>
                    {dropdown}
                </div>
            </div>
                        
        </div>
    )
}

export default GlassSelect