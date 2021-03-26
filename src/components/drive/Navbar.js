import React from "react";
import { useHistory, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

import firelogo from "../../images/fire2.png";

import { Navbar, Nav, Button } from "react-bootstrap";

const NavbarComponent = (props) => {
  const { logout, currentUser } = useAuth();
  const history = useHistory();
  const handleLogout = async () => {
    try {
      await logout();
    } catch {
      console.log("failed to logout");
    }
    history.push("/login");
  };
  return (
    <div>
      <Navbar expand="sm" bg="dark" variant="dark" className="pl-5 pr-5">
        <Navbar.Brand as={Link} to="/" className="mr-auto">
          <img
            alt="fire"
            src={firelogo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          Dashboard
        </Navbar.Brand>
        <Nav>
          <Navbar.Text className="mr-5 active">
            Signed in as :{" "}
            {currentUser.email.substr(0, currentUser.email.indexOf("@"))}
          </Navbar.Text>
          <Button variant="danger" onClick={handleLogout}>
            Logout
          </Button>
        </Nav>
      </Navbar>
    </div>
  );
};

export default NavbarComponent;
