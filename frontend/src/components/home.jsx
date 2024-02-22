import "../styles.css";
import React, { useState, useEffect } from "react";
import { Stack, Button, ThemeProvider, createTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { Reveal } from "./animation";
import Test from "./test";

const theme = createTheme({
  palette: {
    primary: {
      main: "#303f9f",
      contrastText: "#fff",
    },
    secondary: {
      main: "#303f9f",
      contrastText: "#fff",
    },
  },
});

/*
TODO: find if user is login in from previous session
      if so when user click on My model redirect to profile and
      if click on Create model redirect to create
      else redirect to login for both button
*/

function Home() {
  const [user, setUser] = useState(() => {
    const localUser = localStorage.getItem("ITEMS");
    if (localUser == null) return null;

    return JSON.parse(localUser);
  });

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(user));
  }, [user]);

  return (
    <>
      <Reveal>
        <div className="container">
          <div className="header">
            <h1>Vision Model Creator</h1>
          </div>
          <div className="center">
            <span className="p-word p-word-1">
              Revolutionize your approach to vision AI with our platform,
              designed to empower businesses of all sizes.
            </span>{" "}
            <span className="p-word p-word-2">
              Build and deploy high-performance vision models specifically
              optimized for your unique use cases.
            </span>
            <div></div>
          </div>
          <div className="btn-container">
            <ThemeProvider theme={theme}>
              {user === null ? (
                <Stack spacing={3} direction="row">
                  <Link to="/login">
                    <Button variant="contained" color="primary">
                      My Model
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button variant="contained" color="secondary">
                      Create Model
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button variant="contained" color="secondary">
                      Login In
                    </Button>
                  </Link>
                </Stack>
              ) : (
                <Stack spacing={2} direction="row">
                  <Link to="/profile">
                    <Button variant="contained" color="primary">
                      My Model
                    </Button>
                  </Link>
                  <Link to="/create">
                    <Button variant="contained" color="secondary">
                      Create Model
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button variant="contained" color="secondary">
                      Login In
                    </Button>
                  </Link>
                </Stack>
              )}
            </ThemeProvider>
          </div>
        </div>
      </Reveal>
      <Reveal>
        <Test />
      </Reveal>
    </>
  );
}

export default Home;
