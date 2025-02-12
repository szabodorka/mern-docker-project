import "./Loginbtn.css";
export default function Loginbtn ({setIsLoggingIn, setIsRegistering}) {

    function handleLogin(setIsLoggingIn) {
        setIsRegistering(false)
        setIsLoggingIn(true)
    }

    return (

        <div>
        <button onClick = {() => handleLogin(setIsLoggingIn)}className="loginButton">Login</button>
        </div>

    )

}