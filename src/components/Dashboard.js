import React from "react";
import Navbar from "./drive/Navbar";

import { Container } from "react-bootstrap";

import MakeFolder from "./drive/MakeFolder";

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <Container fluid>
        <MakeFolder />
      </Container>
    </div>
  );
};

export default Dashboard;
