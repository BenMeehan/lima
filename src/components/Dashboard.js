import React from "react";
import Navbar from "./drive/Navbar";
import { CssBaseline, Container } from "@material-ui/core";

import MakeFolder from "./drive/MakeFolder";

const Dashboard = () => {
  return (
    <div>
      <CssBaseline />
      <Navbar />
      <Container maxWidth={1}>
        <MakeFolder />
      </Container>
    </div>
  );
};

export default Dashboard;
