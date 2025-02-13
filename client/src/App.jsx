import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import SignIn from "./components/Sign-in-up/SignIn";
import SignUp from "./components/Sign-in-up/SignUp";
import Footer from "./components/Footer/Footer";
import MyProfile from "./components/Navbar/MyProfile";
import CryptoTable from "./components/CryptoTable/CryptoTable";
import Welcome from "./components/Main/Welcome";

function App() {
  const [usersTokens, setUsersTokens] = useState([]);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isOnProfile, setIsOnProfile] = useState(false);
  const [user, setUser] = useState(null);
  const [selectedToken, setSelectedToken] = useState(null);

  const authStates = {
    setIsRegistering,
    setIsLoggingIn,
    setIsOnProfile,
    user,
  };

  function handleLogOut() {
    setUser(null);
  }

  return (
    <>
      <Navbar
        onLogOut={handleLogOut}
        authStates={authStates}
        setSelectedToken={setSelectedToken}
        handleLogOut={handleLogOut}
      />

      {isLoggingIn ? (
        <SignIn
          setIsLoggingIn={setIsLoggingIn}
          setUser={setUser}
          setIsRegistering={setIsRegistering}
        />
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
      return <MyProfile user={user} />;
    }

    if (selectedToken) {
      return (
        <h1>(Under construction!) 🚧 {selectedToken.name}</h1>
      );
    }

    return <CryptoTable />;
  }
}

export default App;
