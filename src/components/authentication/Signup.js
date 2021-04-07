import React, { useRef, useState } from "react";
import { Card, Container, Form, Button, Alert, Image } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";

import logo from "../../images/fire2.png";

const Signup = () => {
  const emailRef = useRef();
  const passRef = useRef();
  const confirmPassRef = useRef();
  const history = useHistory();

  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [showpass1, setShowpass1] = useState(false);
  const [showpass2, setShowpass2] = useState(false);

  const { signup } = useAuth();

  const handleShowPassword1 = () => {
    if (showpass1) {
      setShowpass1(false);
    } else {
      setShowpass1(true);
    }
  };
  const handleShowPassword2 = () => {
    if (showpass2) {
      setShowpass2(false);
    } else {
      setShowpass2(true);
    }
  };

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
            <h2 className="text-center mb-4">Sign Up</h2>
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
                    type={showpass1 ? "text" : "password"}
                    required
                    ref={passRef}
                  ></Form.Control>
                  <Button
                    variant="outline-secondary"
                    onClick={handleShowPassword1}
                  >
                    <i
                      class={showpass1 ? "far fa-eye" : "far fa-eye-slash"}
                    ></i>
                  </Button>
                </div>
              </Form.Group>
              <Form.Group>
                <Form.Label>Confirm Password</Form.Label>
                <div className="d-flex">
                  <Form.Control
                    type={showpass2 ? "text" : "password"}
                    required
                    ref={confirmPassRef}
                  ></Form.Control>
                  <Button
                    variant="outline-secondary"
                    onClick={handleShowPassword2}
                  >
                    <i
                      class={showpass2 ? "far fa-eye" : "far fa-eye-slash"}
                    ></i>
                  </Button>
                </div>
              </Form.Group>
              <Button type="submit" disabled={loading} className="w-100">
                Sign up
              </Button>
            </Form>
          </Card.Body>
          <Card.Footer>
            <div className="text-center">
              Already have an account? <Link to="/login">Log in</Link>
            </div>
          </Card.Footer>
        </Card>
      </div>
    </Container>
  );
};

export default Signup;
