import React from "react";
import Searchbar from "./Searchbar";
import Loginbtn from "./Loginbtn";
import Registerbtn from "./Registerbtn";
import Banner from "../Banner/Banner";
import "./Navbar.css";
import "./Logoutbtn.css";
import "./MyProfileButton.css";
import bull from "../../images/transBull.png";

function Navbar({ userHandlers, setSelectedToken, handleToMainPage }) {
  const {
    setIsRegistering,
    setIsLoggingIn,
    setIsOnProfile,
    user,
    handleLogOut,
  } = userHandlers;

  return (
    <header className="Navbar">
      <Banner />
      <nav className="navbar-elements">
        {user ? (
          <img onClick={handleToMainPage} src={bull} className="logo" />
        ) : (
          <span className="logo" onClick={handleToMainPage}>
            BullRunners
          </span>
        )}

        <div className="grow">
          <Searchbar setSelectedToken={setSelectedToken} />
        </div>
        {user ? (
          <div className="navbar-buttons">
            <button onClick={handleLogOut} className="logoutButton">
              Logout
            </button>
            <button
              onClick={() => {
                setIsOnProfile(true), setSelectedToken(null);
              }}
              className="myProfileButton"
            >
              My profile
            </button>
          </div>
        ) : (
          <div className="navbar-buttons">
            <Registerbtn
              setIsRegistering={setIsRegistering}
              setIsLoggingIn={setIsLoggingIn}
            />
            <Loginbtn
              setIsLoggingIn={setIsLoggingIn}
              setIsRegistering={setIsRegistering}
            />
          </div>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
