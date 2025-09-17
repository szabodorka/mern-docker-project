import { useState } from "react";
import "./SignIn.css";

export default function SignIn({ setIsLoggingIn, setUser, setIsRegistering }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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
    setError("");
    try {
      const response = await fetch(`/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const foundUser = await response.json();
      if (!response.ok) {
        setError(foundUser.error || "Invalid username or password");
        return;
      }
      setUser(foundUser);
      setIsLoggingIn(false);
    } catch (error) {
      console.error(error);
      setError("Login failed. Please try again later.");
    }
  }

  return (
    <form onSubmit={handleLogin} className="signinform">
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
      <button className="submit" type="submit" value="Log in">
        Sign In
      </button>
      {error && (
        <div className="error">
          <div className="error__icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              viewBox="0 0 24 24"
              height="24"
              fill="none"
            >
              <path
                fill="#393a37"
                d="m13 13h-2v-6h2zm0 4h-2v-2h2zm-1-15c-1.3132 0-2.61358.25866-3.82683.7612-1.21326.50255-2.31565 1.23915-3.24424 2.16773-1.87536 1.87537-2.92893 4.41891-2.92893 7.07107 0 2.6522 1.05357 5.1957 2.92893 7.0711.92859.9286 2.03098 1.6651 3.24424 2.1677 1.21325.5025 2.51363.7612 3.82683.7612 2.6522 0 5.1957-1.0536 7.0711-2.9289 1.8753-1.8754 2.9289-4.4189 2.9289-7.0711 0-1.3132-.2587-2.61358-.7612-3.82683-.5026-1.21326-1.2391-2.31565-2.1677-3.24424-.9286-.92858-2.031-1.66518-3.2443-2.16773-1.2132-.50254-2.5136-.7612-3.8268-.7612z"
              ></path>
            </svg>
          </div>
          <div className="error__title">{error}</div>
        </div>
      )}
      <span className="span">
        Don't have an account?{" "}
        <a className="redirect" onClick={() => redirectToRegister()}>
          Sign up
        </a>
      </span>
    </form>
  );
}
