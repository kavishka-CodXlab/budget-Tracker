import { useState } from "react";
import { FaEnvelope, FaLock, FaSignInAlt } from "react-icons/fa";
import "../App.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
  };
  return (
    <div className="login-form-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <label htmlFor="email">Email</label>
        <div className="input-group">
          <FaEnvelope className="input-icon" />
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <label htmlFor="password">Password</label>
        <div className="input-group">
          <FaLock className="input-icon" />
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit">
          <FaSignInAlt style={{ marginRight: "0.5rem" }} /> Login
        </button>
        <p>Email:{email}</p>
        <p>Password:{password}</p>
      </form>
    </div>
  );
};

export default Login;