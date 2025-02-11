import "./Registerbtn.css";
export default function Registerbtn ({setIsRegistering}) {

    function handleRegister(setIsRegistering) {
        setIsRegistering(true)
    }

    return (

        <div>
        <button className="registerButton" onClick={() => handleRegister(setIsRegistering)}>Register</button>
        </div>

    )

}