import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";

const Signup = () => {
  const emailRef = useRef();
  const passRef = useRef();
  const confirmPassRef = useRef();
  const history = useHistory();

  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const { signup } = useAuth();

  const handleSumbit = async (e) => {
    e.preventDefault();

    if (passRef.current.value !== confirmPassRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passRef.current.value);
    } catch {
      setLoading(false);
      return setError("Failed to Sign Up");
    }
    setLoading(false);
    history.push("/");
  };

  return (
    <div>
      <div>
        <h1>Sign Up</h1>
        {error && <p>{error}</p>}
        <form action="" onSubmit={handleSumbit}>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" ref={emailRef} />
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" ref={passRef} />
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            name="confrimPassword"
            id="confrimPassword"
            ref={confirmPassRef}
          />
          <input type="submit" value="Sign Up" disabled={loading} />
        </form>
      </div>
      <div>
        Already have an account? <Link to="/login">Log in</Link>
      </div>
    </div>
  );
};

export default Signup;
