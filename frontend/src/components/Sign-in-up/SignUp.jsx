import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

export default function SignUp({ setIsRegistering, setUser }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function onChange(event) {
    const { name, value } = event.target;
    name === "username" ? setUsername(value) : setPassword(value);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsRegistering?.(false);
    setError("");
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (!response.ok) return setError(data.error || "Registration failed");
      setUser(data);
      navigate("/");
    } catch (error) {
      console.error(error);
      setError("Registration failed. Please try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="signupform">
      <label htmlFor="username" className="label">
        Username
      </label>
      <input
        className="input-span"
        onChange={onChange}
        type="text"
        name="username"
        id="username"
        value={username}
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
        value={password}
      />
      <input className="submit" type="submit" value="Sign Up" />
    </form>
  );
}
