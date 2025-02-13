import { useState } from "react";
import "./SignUp.css";

export default function SignUp({ setIsRegistering, setUser }) {
  
   const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [tokens, setTokens] = useState([{name: "", amount: 0}])

  function onChange(event) {
    const { name, value } = event.target;
    name === "username" ? setUsername(value) : setPassword(value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setIsRegistering(false);

    const data = { username, password, tokens };

    setUser(data); //ezzel az a tré hogy az id nem lesz benne ebben a userben.

    fetch("/api/data", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <label htmlFor="username" className="label">
        Username
      </label>
      <input
        className="input-span"
        onChange={onChange}
        type="username"
        name="username"
        id="username"
      />

      <label htmlFor="password" className="label">
        Password
      </label>
      <input
        className="input-span"
        onChange={onChange}
        type="password"
        name="password"
        id="password"
      />
      <input className="submit" type="submit" value="Sign Up" />
    </form>
  );
}
