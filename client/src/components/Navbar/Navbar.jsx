import React from "react";
import Searchbar from "./Searchbar";
import Loginbtn from "./Loginbtn";
import Registerbtn from "./Registerbtn";
import "./Navbar.css";

function Navbar({ authStates, setSelectedToken, handleLogOut }) {
  const { setIsRegistering, setIsLoggingIn, setIsOnProfile, user } = authStates;

  function handleProfileClick() {
    setIsOnProfile(true);
  }

  return (
    <header className="Navbar">
      <nav>
        <ul>
          <li className="logo">BullRunners Portfolio Tracker</li>
          <li className="grow">
            <Searchbar setSelectedToken={setSelectedToken} />
          </li>
          {user ? (
            <li>
              <button onClick={handleLogOut} className="logout-btn">
                Logout
              </button>
              <button onClick={handleProfileClick}>
                My profile
              </button>
            </li>
          ) : (
            <li>
              <Registerbtn setIsRegistering={setIsRegistering} setIsLoggingIn={setIsLoggingIn} />
              <Loginbtn setIsLoggingIn={setIsLoggingIn} setIsRegistering={setIsRegistering} />
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;