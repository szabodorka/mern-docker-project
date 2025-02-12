import { useState } from "react";
import "./SignIn.css";

export default function SignIn({ setIsLoggingIn, setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function onChange(event) {
    const { name, value } = event.target;

    name === "username" ? setUsername(value) : setPassword(value);
  }

  async function handleLogin(event) {
    event.preventDefault();
    setIsLoggingIn(false);

    try {
      const response = await fetch(`/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const foundUser = await response.json();
      console.log(foundUser);
      setUser(foundUser);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form onSubmit={handleLogin} className="form">
      <span className="input-span">
        <label htmlFor="username" className="label">
          Username
        </label>
        <input
          onChange={onChange}
          type="username"
          name="username"
          id="username"
        />
      </span>
      <span className="input-span">
        <label htmlFor="password" className="label">
          Password
        </label>
        <input
          onChange={onChange}
          type="password"
          name="password"
          id="password"
        />
      </span>
      <span className="span">
        <a href="#">Forgot password?</a>
      </span>
      <input className="submit" type="submit" value="Log in" />
      <span className="span">
        Don't have an account? <a onClick={() => console.log("asd")}>Sign up</a>
      </span>
    </form>
  );
}
