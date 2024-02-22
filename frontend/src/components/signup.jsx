import React, { useState } from "react";
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
TODO: when user signup, store the data, and redirect the user to login page 
*/

export default function SignUp() {
  const [errorU, setErrorU] = useState(false);
  const [errorP, setErrorP] = useState(false);
  const [errorE, setErrorE] = useState(false);

  const [email, setEmail] = useState("");
  const [errorER, setErrorER] = useState(false);

  const handleChange = (event) => {
    setEmail(event.target.value);
    setErrorER(!validateEmail(event.target.value)); // Update error state with validation result
  };

  const validateEmail = (email) => {
    const regex = /^[^@]+@[^@]+\.com$/; // Improved regex using named groups
    return regex.test(email);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const vari = {
      email: data.get("email"),
      username: data.get("username"),
      password: data.get("password"),
    };

    if (data.get("username") === "") {
      if (data.get("password") === "") {
        if (data.get("email") === "") {
          setErrorU(true);
          setErrorP(true);
          setErrorE(true);
        }
      }
    }
    if (data.get("username") === "") {
      setErrorU(true);
    }
    if (data.get("password") === "") {
      setErrorP(true);
    }
    if (data.get("email") === "") {
      setErrorE(true);
    }
    if (data.get("username") !== "") {
      setErrorU(false);
    }
    if (data.get("password") !== "") {
      setErrorP(false);
    }
    if (data.get("email") !== "") {
      setErrorE(false);
    }

    if (data.get("username") !== "") {
      if (data.get("password") !== "") {
        if (data.get("email") !== "") {
          setErrorU(false);
          setErrorP(false);
          setErrorE(false);
        }
      }
    }
    fetch("/api/signingUp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(vari),
    })
      .then((res) => res.json())
      .then((re) => {
        if (re.found === "true") {
          // Handle username already existing (e.g., set error state, display message)
          if (re.problem === "existed") {
            alert("Invalid username already exist");
          } else {
            setErrorU(true);
            setErrorP(true);
            setErrorE(true);
            alert("Invalid inputs");
          }
        } else {
          // Process the successful response normally
          setErrorU(false);
          setErrorP(false);
          setErrorE(false);
          window.location.href = "/login";
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
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  error={errorU}
                  helperText={errorU === true ? "Invalid Username" : ""}
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={errorE || errorER}
                  helperText={
                    errorER || errorE
                      ? "Invalid Email (Must include '@' and end with '.com')"
                      : ""
                  }
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={errorP}
                  helperText={
                    errorP === true
                      ? "Invalid Password (Need to contain atleast 7 characters)"
                      : ""
                  }
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
