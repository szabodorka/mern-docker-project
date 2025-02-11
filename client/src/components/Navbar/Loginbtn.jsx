import "./Loginbtn.css";
export default function Loginbtn ({setIsLoggingIn}) {

    function handleLogin(setIsLoggingIn) {
        setIsLoggingIn(true)
    }

    return (

        <div>
        <button onClick = {() => handleLogin(setIsLoggingIn)}className="loginButton">Login</button>
        </div>

    )

}