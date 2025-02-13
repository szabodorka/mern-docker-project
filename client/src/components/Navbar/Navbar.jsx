import React from "react";
import Searchbar from "./Searchbar";
import Loginbtn from "./Loginbtn";
import Registerbtn from "./Registerbtn";
import "./Navbar.css";

function Navbar({ user, onLogOut, setIsRegistering, setIsLoggingIn, setIsOnProfile }) {
  return (
    <header className="Navbar">
      <nav>
        <ul>
          <li className="logo">BullRunners Portfolio Tracker</li>

          <li className="grow">
            <Searchbar />
          </li>

          {user ? (
            <li>
            <button onClick={onLogOut} className="logout-btn">
              Logout
            </button>
            <button onClick={() => setIsOnProfile(true)}>My Profile</button>
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
