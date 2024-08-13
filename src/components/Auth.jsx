import { useRef, useState } from "react";
import firebase from "../firebase";

const Auth = ()=>{
  const [ phoneNumber,setPhoneNumber] = useState('')
  const [ verificationCode,setVerificationCode] = useState('')
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
      console.log("confirmationResult",confirmationResult)
      setVerificationId(confirmationResult.verificationId)
      alert("otp send to your mobile")
      //logic
    })
    .catch(error=>console.error('error in sending OTP',error))
  }


  const handleOTP = ()=>{
    const credentials = firebase.auth.PhoneAuthProvider.credential(verificationId,verificationCode)
    firebase.auth().signInWithCredential(credentials)
    .then(userCredentials=>{
      console.log('user loggend in CRED',userCredentials)
      // console.log('user loggend in',userCredentials.user)
    })
    .catch(error=>console.log("error in handle otp",error))
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
    <br/>
    <br/>
    <input type="text" placeholder="enter otp" 
    value={verificationCode}
    onChange={e=>setVerificationCode(e.target.value)}
    />
    <button onClick={handleOTP}>enter OTP</button>
    </>
  )
}
export default Auth