import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [usersTokens, setUsersTokens] = useState([])

  useEffect(async () => {

    try {
      const response = await fetch("")
    } catch (error) {
      
    }

  })

  return (
    <div>

      <nav></nav>



    </div>
  )
}

export default App
