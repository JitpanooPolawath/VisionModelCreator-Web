import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const defaultTheme = createTheme({
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
TODO: when user login, see if username and password is correct
      using database
      if so redirect to profile page
      else if user pressed forgot password redirect
*/

export default function Login() {
  const [user, setUser] = useState(() => {
    const localUser = localStorage.getItem("ITEMS");
    if (localUser == null) return null;

    return JSON.parse(localUser);
  });

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(user));
  }, [user]);

  const [errorU, setErrorU] = useState(false);
  const [errorP, setErrorP] = useState(false);

  const handleSubmit = (event) => {
    const data = new FormData(event.currentTarget);
    const vari = {
      username: data.get("username"),
      password: data.get("password"),
    };
    if (data.get("username") === "") {
      if (data.get("password") === "") {
        setErrorU(true);
        setErrorP(true);
      }
    }
    if (data.get("username") === "") {
      if (data.get("password") !== "") {
        setErrorP(false);
      }
      setErrorU(true);
    } else if (data.get("password") === "") {
      if (data.get("username") !== "") {
        setErrorU(false);
      }
      setErrorP(true);
    }

    fetch("/api/loggingIn", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(vari),
    })
      .then((res) => res.json())
      .then((re) => {
        if (re.found === "true") {
          setErrorU(false);
          setErrorP(false);
          setUser({
            userID: re.userID,
            username: data.get("username"),
            password: data.get("password"),
          });
          window.location.href = "/profile";
        } else {
          setErrorU(true);
          setErrorP(true);
          alert("Incorrect password or username");
        }
      });
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <VisibilityTwoToneIcon />
          </Avatar>
          <Typography component="h1" variant="h5" color="primary">
            Welcome Back
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              error={errorU}
              helperText={errorU === true ? "Invalid Username" : ""}
              color="primary"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              error={errorP}
              helperText={errorP === true ? "Invalid Password" : ""}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>

            <Grid container>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
