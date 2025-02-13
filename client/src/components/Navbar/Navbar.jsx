import React from "react";
import Searchbar from "./Searchbar";
import Loginbtn from "./Loginbtn";
import Registerbtn from "./Registerbtn";
import Banner from "./Banner";
import "./Navbar.css";
import "./Logoutbtn.css";

function Navbar({ user, onLogOut, setIsRegistering, setIsLoggingIn }) {
  return (
    <header className="Navbar">
      <Banner />
      <nav className="navbar-elements">
        {user ? (
          <img src="../images/logo.png" className="logo" />
        ) : (
          <span className="logo">BullRunners Portfolio Tracker</span>
        )}

        <div className="grow">
          <Searchbar />
        </div>

        {user ? (
          <button onClick={onLogOut} className="logout-btn">
            Logout
          </button>
        ) : (
          <div className="navbar-buttons">
            <Registerbtn setIsRegistering={setIsRegistering} />
            <Loginbtn setIsLoggingIn={setIsLoggingIn} />
          </div>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
