import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import SignIn from "./components/Sign-in-up/SignIn";
import SignUp from "./components/Sign-in-up/SignUp";
import Footer from "./components/Footer/Footer";
import CryptoTable from "./components/CryptoTable/CryptoTable";

function App() {
  const [usersTokens, setUsersTokens] = useState([]);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [user, setUser] = useState(null);

  function handleLogOut() {
    setUser(null);
  }

  return (
    <>
      <Navbar
        user={user}
        onLogOut={handleLogOut}
        setIsRegistering={setIsRegistering}
        setIsLoggingIn={setIsLoggingIn}
      />

      {isLoggingIn ? (
        <SignIn setIsLoggingIn={setIsLoggingIn} setUser={setUser} />
      ) : isRegistering ? (
        <SignUp setIsRegistering={setIsRegistering} setUser={setUser} />
      ) : null}
      {user && <CryptoTable />}
      <Footer />
    </>
  );
}

export default App;
