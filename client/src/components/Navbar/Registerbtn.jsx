import "./Registerbtn.css";
export default function Registerbtn ({setIsRegistering, setIsLoggingIn}) {

    function handleRegister(setIsRegistering) {
        setIsLoggingIn(false)
        setIsRegistering(true)
    }

    return (

        <div>
        <button className="registerButton" onClick={() => handleRegister(setIsRegistering)}>Register</button>
        </div>

    )

}