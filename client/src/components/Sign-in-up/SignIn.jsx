import { useState } from "react";
import "./SignIn.css";

export default function SignIn({ setIsLoggingIn, setUser, setIsRegistering }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function onChange(event) {
    const { name, value } = event.target;

    name === "username" ? setUsername(value) : setPassword(value);
  }

  function redirectToRegister() {
    setIsLoggingIn(false);
    setIsRegistering(true);
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
      setUser(foundUser);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form onSubmit={handleLogin} className="form">
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
      <span className="span">
        <a href="#">Forgot password?</a>
      </span>
      <button className="submit" type="submit" value="Log in">
        Sign in
      </button>
      <span className="span">
        Don't have an account?{" "}
        <a onClick={() => redirectToRegister()}>Sign up</a>
      </span>
    </form>
  );
}
