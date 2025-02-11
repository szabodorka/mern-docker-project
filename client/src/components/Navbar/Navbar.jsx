import React from "react";
import Searchbar from "./Searchbar";
import Loginbtn from "./Loginbtn";
import Registerbtn from "./Registerbtn";
import "./Navbar.css";

function Navbar ({setIsRegistering, setIsLoggingIn}) {

return (
  <div className="Navbar">
    <nav>
      <ul>
        <li className="grow">
            
        </li> 
        <li>
        <Searchbar/>
        </li>
          
        <li>
          <Registerbtn setIsRegistering = {setIsRegistering}/>
          <Loginbtn setIsLoggingIn = {setIsLoggingIn}/>
          
        </li>
      </ul>
    </nav>
  </div>
)

}
  

export default Navbar;