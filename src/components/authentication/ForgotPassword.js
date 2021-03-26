import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";

const ForgotPassword = () => {
  const emailRef = useRef();

  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const { resetPassword } = useAuth();

  const handleSumbit = async (e) => {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
    } catch {
      setLoading(false);
      return setError(
        "Failed to send reset link. Make sure the email is correct."
      );
    }
    setLoading(false);
    setMessage("Check Your Inbox");
  };

  return (
    <div>
      <div>
        <h1>Reset Password</h1>
        {error && <p>{error}</p>}
        {message && <p>{message}</p>}
        <form action="" onSubmit={handleSumbit}>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" ref={emailRef} />
          <input type="submit" value="Reset Password" disabled={loading} />
          <Link to="/login">Login</Link>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
