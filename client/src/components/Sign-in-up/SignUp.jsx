import { useState } from "react";
import "./SignUp.css"

export default function SignUp({setIsRegistering}) {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [tokens, setTokens] = useState([""])

    function onChange(event) {

        const { name, value } = event.target

        name === "username" ? setUsername(value) : setPassword(value)

    }

    function handleSubmit(event) {

        event.preventDefault()
        setIsRegistering(false)

        const data = { username, password, tokens }

        fetch('/api/data', {
            method: "POST",
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(respone => respone.json())
            .then(respone => {
                console.log(respone)
            })
            .catch(error => console.log(error))
    }



return (
    <form onSubmit={handleSubmit} className="form">
        <span className="input-span">
            <label htmlFor="username" className="label">Username</label>
            <input onChange={onChange} type="username" name="username" id="username"
            /></span>
        <span className="input-span">
            <label htmlFor="password" className="label">Password</label>
            <input onChange={onChange} type="password" name="password" id="password" 
            /></span>
        <input className="submit" type="submit" value="Sign Up" />
    </form>
)
}
