import React, { useState, useEffect } from "react";
import { Stack, Button, ThemeProvider, createTheme } from "@mui/material";
import { Link } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: "#303f9f",
      contrastText: "#fff",
    },
  },
});

/*
TODO: when on logout page, delete local storage history of account
      information.
*/

function Logout() {
  const initialUser = localStorage.getItem("ITEMS")
    ? JSON.parse(localStorage.getItem("ITEMS"))
    : null;

  const [user, setUser] = useState(initialUser);

  // Logout function
  const handleLogout = () => {
    setUser(null); // Clear user state
    localStorage.removeItem("ITEMS"); // Clear local storage
  };
  return (
    <>
      <div style={{ margin: 70 }}>
        <h1>Logout!</h1>
        <p>You have logout. Please click Home</p>
      </div>
      <ThemeProvider theme={theme}>
        <Stack spacing={2} direction="row" sx={{ justifyContent: "center" }}>
          <Link to="/">
            <Button onClick={handleLogout} variant="contained" color="primary">
              yes to logout
            </Button>
          </Link>
          <Link to="/profile">
            <Button variant="contained" color="primary">
              No go back to My Model
            </Button>
          </Link>
        </Stack>
      </ThemeProvider>
    </>
  );
}

export default Logout;
