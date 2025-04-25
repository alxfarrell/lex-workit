import { Link } from "react-router-dom";

export default function homepage() {
  return (
    <div>
      <h1>Welcome to Lex-WorkIt</h1>
      <p>Your workout, simplified.</p>
      <Link to="/create-account">Create Account</Link>
      <Link to="/login">Login</Link>
    </div>
  );
}