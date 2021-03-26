import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";

const Login = () => {
  const emailRef = useRef();
  const passRef = useRef();
  const history = useHistory();

  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  const handleSumbit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passRef.current.value);
    } catch {
      setLoading(false);
      return setError("Failed to Sign In");
    }
    setLoading(false);
    history.push("/");
  };

  return (
    <div>
      <div>
        <h1>Login</h1>
        {error && <p>{error}</p>}
        <form action="" onSubmit={handleSumbit}>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" ref={emailRef} />
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" ref={passRef} />
          <Link to="/forgotPassword">Forgot Password?</Link>
          <input type="submit" value="Log In" disabled={loading} />
        </form>
      </div>
      <div>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
};

export default Login;
