import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import SignIn from "./components/Sign-in-up/SignIn";
import SignUp from "./components/Sign-in-up/SignUp";
import Footer from "./components/Footer/Footer";
import Welcome from "./components/Main/Welcome";

function App() {

  const [usersTokens, setUsersTokens] = useState([]);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isOnProfile, setIsOnProfile] = useState(false)
  
  function handleLogOut() {
    setUser(null);
  }

  console.log(user);
  

  return (
    <>
      <Navbar
        user={user}
        onLogOut={handleLogOut}
        setIsRegistering={setIsRegistering}
        setIsLoggingIn={setIsLoggingIn}
        setIsOnProfile={setIsOnProfile}
      />

      {isLoggingIn ? (
        <SignIn setIsLoggingIn={setIsLoggingIn} setUser={setUser} />
      ) : isRegistering ? (
        <SignUp setIsRegistering={setIsRegistering} setUser={setUser} />
      ) :  !user ? <Welcome/> : isOnProfile ? <h1>Your on Profile!</h1> : <h1>Ur logged in!</h1>}
      <Footer />
    </>
  );
}

export default App;
