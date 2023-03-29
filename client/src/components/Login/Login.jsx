import React, {useState} from 'react'
import { registerWithGoogle } from '../../firebase/auth/googleLogIn'
import {sigInWithMail} from '../../firebase/auth/auth'
import { Link } from 'react-router-dom'


const Login = () => {

  const [userData, setUserData] = useState({
    email: '',
    password: ''
  })

  function registerMail(){
    sigInWithMail(userData)
    
  }

  function registerGoogle(){
    registerWithGoogle()
  }

  function handleInputChange (e) {
    setUserData({...userData,[e.target.name]:e.target.value})
  }

  return (
    <div>
      <form onSubmit={registerMail}>
        <label htmlFor="">Usuario</label>
        <input type="text" name='email' onChange={handleInputChange} />
        <label htmlFor="">Contraseña</label>
        <input type="password" name='password' onChange={handleInputChange}/>
        <button type='submit'>Log In</button>
      </form>
      <br />
      <div>
        <button onClick={() => {registerGoogle()}}>Inicia sesion con Google</button>
      </div>
      <Link to={'/register'}>No tienes Cuenta? crea una</Link>
    </div>
  )
}

export default Login