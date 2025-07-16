import { useState } from "react";
import { FaEnvelope, FaLock, FaSignInAlt } from "react-icons/fa";
import styled from "styled-components";

const LoginFormContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #181c20;
`;

const LoginForm = styled.form`
  background: rgba(34, 40, 49, 0.95);
  border-radius: 1.5rem;
  box-shadow: 0 8px 32px 0 rgba(0,0,0,0.37);
  padding: 2.5rem 2rem;
  width: 100%;
  max-width: 350px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Heading = styled.h2`
  background: linear-gradient(90deg, #00ff99, #00c16e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
`;

const Label = styled.label`
  color: #e0e0e0;
  font-size: 1rem;
  margin-bottom: 0.25rem;
  margin-left: 0.25rem;
`;

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  background: #23272f;
  border: 1.5px solid #00ff99;
  border-radius: 0.75rem;
  padding: 0.5rem 1rem;
  margin-bottom: 0.5rem;
  transition: border 0.2s;
  &:focus-within {
    border-color: #00c16e;
  }
`;

const InputIcon = styled.div`
  color: #00ff99;
  margin-right: 0.75rem;
  font-size: 1.1rem;
`;

const Input = styled.input`
  background: transparent;
  border: none;
  outline: none;
  color: #fff;
  font-size: 1rem;
  flex: 1;
  padding: 0.75rem 0;
`;

const Button = styled.button`
  background: linear-gradient(90deg, #00ff99, #00c16e);
  color: #181c20;
  font-weight: 700;
  border: none;
  border-radius: 0.75rem;
  padding: 0.75rem 1rem;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background: linear-gradient(90deg, #00c16e, #00ff99);
    color: #fff;
  }
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
  };
  return (
    <LoginFormContainer>
      <LoginForm onSubmit={handleSubmit}>
        <Heading>Login</Heading>
        <Label htmlFor="email">Email</Label>
        <InputGroup>
          <InputIcon><FaEnvelope /></InputIcon>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </InputGroup>
        <Label htmlFor="password">Password</Label>
        <InputGroup>
          <InputIcon><FaLock /></InputIcon>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </InputGroup>
        <Button type="submit">
          <FaSignInAlt style={{ marginRight: "0.5rem" }} /> Login
        </Button>
        <p>Email: {email}</p>
        <p>Password: {password}</p>
      </LoginForm>
    </LoginFormContainer>
  );
};

export default Login;