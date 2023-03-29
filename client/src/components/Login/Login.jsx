import React from 'react'
import { registerWithGoogle } from '../../firebase/auth/googleLogIn'

const Login = () => {

  function register(){
    registerWithGoogle()
  }

  return (
    <div>
      <form action="">
        <label htmlFor="">Usuario</label>
        <input type="text" />
        <label htmlFor="">Contraseña</label>
        <input type="text" />
        <button></button>
      </form>
      <br />
      <div>
        <button onClick={() => {register()}}>Inicia sesion con Google</button>
      </div>
    </div>
  )
}

export default Login