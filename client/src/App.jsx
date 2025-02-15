import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import SignIn from "./components/Sign-in-up/SignIn";
import SignUp from "./components/Sign-in-up/SignUp";
import Footer from "./components/Footer/Footer";
import MyProfile from "./components/Navbar/MyProfile";
import CryptoTable from "./components/CryptoTable/CryptoTable";
import Welcome from "./components/Welcome/Welcome";
import ChosenToken from "./components/TokenInfo/ChosenToken";

function App() {
  const [usersTokens, setUsersTokens] = useState([]);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isOnProfile, setIsOnProfile] = useState(false);
  const [user, setUser] = useState(null);
  const [selectedToken, setSelectedToken] = useState(null);

  const userHandlers = {
    setIsRegistering,
    setIsLoggingIn,
    setIsOnProfile,
    user,
    handleLogOut
  };

  function handleLogOut() {
    setUser(null);
  }

  return (
    <>
      <Navbar
        onLogOut={handleLogOut}
        userHandlers = {userHandlers}
        setSelectedToken={setSelectedToken}
      />
      {isLoggingIn ? (
        <SignIn
          setIsLoggingIn={setIsLoggingIn}
          setUser={setUser}
          setIsRegistering={setIsRegistering}
        />
      ) : isRegistering ? (
        <SignUp
          setIsRegistering={setIsRegistering}
          setUser={setUser} />
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
      return <MyProfile user={user} />;
    }

    if (selectedToken) {
      return (
        <ChosenToken selectedToken={selectedToken}/>
      );
    }

    return <CryptoTable />;
  }
}

export default App;
