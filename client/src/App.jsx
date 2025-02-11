import { use, useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import SignIn from './components/Sign-in-up/SignIn'
import SignUp from './components/Sign-in-up/SignUp'

function App() {
  const [usersTokens, setUsersTokens] = useState([])
  const [isRegistering, setIsRegistering] = useState(false)
  const [isLoggingIn, setIsLoggingIn] = useState(false)



  // useEffect(async () => {

  //   try {
  //     const response = await fetch("")
  //   } catch (error) {
  //     console.error(error)
  //   }

  // })

  return (

    <>
      <Navbar setIsRegistering={setIsRegistering} setIsLoggingIn={setIsLoggingIn} />

      {isLoggingIn ? (
        <SignIn />
      ) : isRegistering ? (
        <SignUp />
      ) : null}

    </>

  )
}

export default App
