import GlassInput from "./Components/glassInput"
import {useState,useEffect} from 'react'
import GlassSelect from "./Components/glassSelect"
import axios from 'axios'
import Modal from "./Components/modal"
import loadr from "./tenor.gif"
const App = () =>{
  const [id,setId] = useState('')
  const [pClass,setPClass] = useState('')
  const [gender,setGender] = useState('')
  const [age,setAge] = useState(0)
  const [sibsip,setSibsip] = useState(0)
  const [parch,setParch] = useState(0)
  const [fare,setFare] = useState(0)
  const [embarkment,setEmbarkment] = useState('')
  const [passengerIds,setPIds] = useState([])

  const [modalColor,setModalColor] = useState('text-success')
  const [modalHide,setModalHide] = useState(true)
  const [modalMessage,setModalMessage] = useState('')
  const [showLoader,setLoader] = useState(false)

  const getPassengerIds = () =>{
    axios.get("http://127.0.0.1:5000/v1/getPassengerIds")
    .then(response =>{
      setPIds(response.data)
    })
    .catch(err=>{
      console.log(err)
    })
  }

  const getPredicton = () =>{
    setLoader(true)
    let arr =[]
    let pclass = pClass==='First Class'?1:pClass==='Second Class'?2:3
    let sexM = gender==='Male'? 1.0:0.0
    let sexF = gender==='Female'? 1.0:0.0
    let embC = embarkment==='Cherbourg'?1.0:0.0
    let embQ = embarkment===' Queenstown'?1.0:0.0
    let embS = embarkment==='Southampton'?1.0:0.0
    //#PassengerId	Pclass	Sex_male	Sex_female	Age	SibSp	Parch	Fare	Embarked_S	Embarked_C	Embarked_Q
    arr = [parseInt(id),pclass,sexM,sexF, parseInt(age),parseInt(sibsip),parseInt(parch),parseInt(fare),embS,embC,embQ]
    arr = arr.toString()
    console.log(arr)

    axios.post("http://127.0.0.1:5000/v1/getPred",{args:arr})
    .then(response =>{
      setLoader(false)
      if(response.data===1){
        setModalColor('text-success pb-3 text-center')
        setModalMessage('Survived')
        setModalHide(false)
      }
      else{
        setModalColor('text-danger pb-3 text-center')
        setModalMessage('Did Not Survive')
        setModalHide(false)
      }
      console.log(response.data)
    })
  }

  useEffect(() => {
    getPassengerIds()
  },[]);
  
  if(!passengerIds.length) return (<span>Loading...</span>)


  
  return (
      <div className="container-fluid">
          <div className="row">
              <div className="col-lg-4 col-md-6 offset-lg-4 offset-md-3">
                <div className="bg-glass p-2 rounded text-center mb-4 mt-5">
                  <h2>Titanic Prediction</h2>
                </div>  
                <div className="bg-glass p-2 rounded text-center">
                  <GlassSelect placeHolder = "Select Passenger Id" inputLabel="Passenger Id" selectOptions={passengerIds} onSelect = {(element)=>{setId(element)}}/>
                  <GlassSelect placeHolder = "Select Passenger Class" inputLabel="Passenger Class" selectOptions={['First Class','Second Class','Third Class']} onSelect = {(element)=>{setPClass(element)}}/>
                  <GlassSelect placeHolder = "Select Gender" inputLabel="Gender" selectOptions={['Male','Female']} onSelect = {(element)=>{setGender(element)}}/>
                  <div className="row">
                    <div className="col-6 mr-0 pr-1">
                      <GlassInput placeHolder="Enter Age" inputLabel="Age" inputType="number" handleChange={(e)=>{setAge(e.target.value)}}/>
                    </div>
                    <div className="col-6 ml-0 pl-1">
                      <GlassInput placeHolder="Enter Fare" inputLabel="Fare" inputType="number" handleChange={(e)=>{setFare(e.target.value)}}/>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6 pr-1">
                      <GlassInput placeHolder="Enter Parent/Children Count" inputLabel="Enter Parent/Children" inputType="number" handleChange={(e)=>{setParch(e.target.value)}}/>
                    </div>
                    <div className="col-6 pl-1">
                      <GlassInput placeHolder="Enter Sibling/Spouse Count" inputLabel="Sibling/Spouse Count" inputType="number" handleChange={(e)=>{setSibsip(e.target.value)}}/>                   
                    </div>
                  </div>
                  
                  <GlassSelect placeHolder = "Select Embarkment" inputLabel="Embarkment" selectOptions={['Cherbourg',' Queenstown','Southampton']} onSelect = {(element)=>{setEmbarkment(element)}}/>
                  <button className="glass-btn" onClick={getPredicton} disabled={showLoader?"disabled":""}>Predict 
                  { showLoader? <img src={loadr} alt="" height="17" className="ml-2"/>:""}
                  </button>
                </div> 
              </div>
          </div>
          <Modal message={modalMessage} color={modalColor} hide={modalHide} close={()=>{setModalHide(true)}}/>
      </div>
  )
}

export default App