import React, { useRef, useState } from "react";
import { Card, Container, Form, Button, Alert, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";
import logo from "../../images/fire2.png";

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
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <div className="d-flex justify-content-center mb-4">
          <Image src={logo} rounded className="w-25" />
        </div>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Reset Password</h2>
            {error && (
              <Alert variant="danger" className="w-100 text-center">
                {error}
              </Alert>
            )}
            {message && (
              <Alert variant="success" className="w-100 text-center">
                {message}
              </Alert>
            )}
            <Form action="" onSubmit={handleSumbit}>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  required
                  ref={emailRef}
                ></Form.Control>
              </Form.Group>
              <Button type="submit" disabled={loading} className="w-100">
                Reset
              </Button>
            </Form>
          </Card.Body>
          <Card.Footer>
            <div className="text-center">
              <Link to="/login">Login</Link>
            </div>
          </Card.Footer>
        </Card>
      </div>
    </Container>
  );
};

export default ForgotPassword;
