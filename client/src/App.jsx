import { use, useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import SignIn from "./components/Sign-in-up/SignIn";
import SignUp from "./components/Sign-in-up/SignUp";
import Footer from "./components/Footer/Footer";

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

      {isLoggingIn ? <SignIn /> : isRegistering ? <SignUp /> : null}
      <Footer />
    </>
  );
}

export default App;