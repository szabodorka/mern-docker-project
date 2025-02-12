import React from "react";
import Searchbar from "./Searchbar";
import Loginbtn from "./Loginbtn";
import Registerbtn from "./Registerbtn";
import "./Navbar.css";

function Navbar({ user, onLogOut, setIsRegistering, setIsLoggingIn }) {
  return (
    <header className="Navbar">
      <nav>
        <ul>
          <li className="logo">BullRunners Portfolio Tracker</li>

          <li className="grow">
            <Searchbar />
          </li>

          {user ? (
            <button onClick={onLogOut} className="logout-btn">
              Logout
            </button>
          ) : (
            <li>
              <Registerbtn setIsRegistering={setIsRegistering} />
              <Loginbtn setIsLoggingIn={setIsLoggingIn} />
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
