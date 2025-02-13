import React from "react";
import Searchbar from "./Searchbar";
import Loginbtn from "./Loginbtn";
import Registerbtn from "./Registerbtn";
import Banner from "./Banner";
import "./Navbar.css";
import "./Logoutbtn.css";

function Navbar({ authStates, setSelectedToken, handleLogOut }) {
  const { setIsRegistering, setIsLoggingIn, setIsOnProfile, user } = authStates;

  function handleProfileClick() {
    setIsOnProfile(true);
  }

  return (
    <header className="Navbar">
      <Banner />
      <nav className="navbar-elements">
        {user ? (
          <img src="../images/logo.png" className="logo" />
        ) : (
          <span className="logo">BullRunners</span>
        )}

        <div className="grow">
          <Searchbar setSelectedToken={setSelectedToken} />
        </div>

        {user ? (
          <div>
            <button onClick={handleLogOut} className="logout-btn">
              Logout
            </button>
            <button onClick={handleProfileClick}>
              My profile
            </button>
          </div>


        ) : (
          <div className="navbar-buttons">
            <Registerbtn setIsRegistering={setIsRegistering} setIsLoggingIn={setIsLoggingIn} />
            <Loginbtn setIsLoggingIn={setIsLoggingIn} setIsRegistering={setIsRegistering}/>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Navbar;