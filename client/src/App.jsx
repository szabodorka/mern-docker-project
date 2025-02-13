import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import SignIn from "./components/Sign-in-up/SignIn";
import SignUp from "./components/Sign-in-up/SignUp";
import Footer from "./components/Footer/Footer";
import CryptoTable from "./components/CryptoTable/CryptoTable";
import Welcome from "./components/Main/Welcome";

function App() {

  const [usersTokens, setUsersTokens] = useState([]);
  const [isRegistering, setIsRegistering] = useState(false)
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [user, setUser] = useState(null)
  const [isOnProfile, setIsOnProfile] = useState(false)
  const [selectedToken, setSelectedToken] = useState(null)

  const authStates = {
    setIsRegistering,
    setIsLoggingIn,
    setIsOnProfile,
    user,
  }
  
  function handleLogOut() {
    setUser(null);
  }

  console.log(user);
  return (
    <>
      <Navbar
        authStates={authStates}
        setSelectedToken={setSelectedToken}
        handleLogOut = {handleLogOut}
      />
  
      {isLoggingIn ? (
        <SignIn setIsLoggingIn={setIsLoggingIn} setUser={setUser} />
      ) : isRegistering ? (
        <SignUp setIsRegistering={setIsRegistering} setUser={setUser} />
      ) : !user ? (
        <Welcome />
      ) : (
        <ProfileOrDashboard />
      )}
      <Footer />
    </>
  );
  
  function ProfileOrDashboard() {
    if (isOnProfile) {
      return <h1>Your on Profile!</h1>;
    }

    if (selectedToken) {
      return <h1>You're logged in with a token selected! {selectedToken.name}</h1>;
    }
  
    return <CryptoTable/>
  }
  

}

export default App;
