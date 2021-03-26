import React from "react";
import { useHistory, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
}));

const Navbar = (props) => {
  const classes = useStyles();
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
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h3" className={classes.title}>
            <Link to="/">Lima</Link>
          </Typography>
          <Typography variant="h6">
            {currentUser.email.substr(0, currentUser.email.indexOf("@"))}
          </Typography>
          <Button onClick={handleLogout}>Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
