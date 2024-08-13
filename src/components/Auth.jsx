import { useRef, useState } from "react";
import firebase from "../firebase";

const Auth = ()=>{
  const [ phoneNumber,setPhoneNumber] = useState('')
  const [verificationId,setVerificationId] = useState('')
  const recaptchaRef = useRef(null)
  const handleSendOTP = ()=>{
    if(recaptchaRef.current){
      recaptchaRef.current.innerHTML = "<div id='recaptcha-container'></div>"
    }

    const verifier = new firebase.auth.RecaptchaVerifier('recaptcha-container',{
      size:"invisible"
    })

    firebase.auth().signInWithPhoneNumber(phoneNumber,verifier)
    .then(confirmationResult=>{
      setVerificationId(confirmationResult.verificationId)
      alert(verificationId)
      //logic
    })
    .catch(error=>console.error('error in sending OTP',error))
  }
  return (
    <>
    <h1> OTP Authentication</h1>
    <div ref={recaptchaRef}></div>
    <input type="tel" placeholder="+91 123456789" 
    value={phoneNumber}
    onChange={e=>setPhoneNumber(e.target.value)}
    />
    <button onClick={handleSendOTP}>Send OTP</button>
    </>
  )
}
export default Auth