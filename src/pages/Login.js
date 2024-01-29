import React from 'react'
import {auth, provider} from '../firebase'
import {signInWithPopup} from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

function Login({setIsAuth}) {
  let navigate = useNavigate()

  function signInWithGoogle(){
    signInWithPopup(auth, provider).then((results)=>{
      localStorage.setItem("isAuth", true)
      setIsAuth(true)
      navigate("/")
    })
  } 
  return (
    <div className='loginPage text-center items-center flex-col pt-5'>
      <p className='pb-3'>Entre com sua conta Google</p>
      <button className='login-with-google-btn' onClick={signInWithGoogle}>
        Sign in With Google 
      </button>
    </div>
  )
}

export default Login