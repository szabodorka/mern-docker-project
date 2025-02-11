import { use, useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import SignIn from './components/Sign-in-up/SignIn'
import SignUp from './components/Sign-in-up/SignUp'

function App() {

  const [user, setUser] = useState(null)
  const [usersTokens, setUsersTokens] = useState([])
  const [isRegistering, setIsRegistering] = useState(false)
  const [isLoggingIn, setIsLoggingIn] = useState(false)

  return (

    <>
      <Navbar setIsRegistering={setIsRegistering} setIsLoggingIn={setIsLoggingIn} />

      {isLoggingIn ? (
        <SignIn setIsLoggingIn = {setIsLoggingIn} setUser = {setUser}/>
      ) : isRegistering ? (
        <SignUp setIsRegistering = {setIsRegistering} />
      ) : null}

    </>

  )
}

export default App
