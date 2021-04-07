import React, { useRef, useState } from "react";
import { Card, Container, Form, Button, Alert, Image } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";
import logo from "../../images/fire2.png";

const Login = () => {
  const emailRef = useRef();
  const passRef = useRef();
  const history = useHistory();

  const [error, setError] = useState();
  const [showpass, setShowpass] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const handleShowPassword = () => {
    if (showpass) {
      setShowpass(false);
    } else {
      setShowpass(true);
    }
  };

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
            <h2 className="text-center mb-4">Log In</h2>
            {error && (
              <Alert variant="danger" className="w-100 text-center">
                {error}
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
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <div className="d-flex">
                  <Form.Control
                    type={showpass ? "text" : "password"}
                    required
                    ref={passRef}
                  ></Form.Control>
                  <Button
                    variant="outline-secondary"
                    onClick={handleShowPassword}
                  >
                    <i class={showpass ? "far fa-eye" : "far fa-eye-slash"}></i>
                  </Button>
                </div>
              </Form.Group>
              <div className="w-100 text-center mb-3">
                <Link to="/forgotPassword">Forgot Password?</Link>
              </div>
              <Button type="submit" disabled={loading} className="w-100">
                Log in
              </Button>
            </Form>
          </Card.Body>
          <Card.Footer>
            <div className="text-center">
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </div>
          </Card.Footer>
        </Card>
      </div>
    </Container>
  );
};

export default Login;
