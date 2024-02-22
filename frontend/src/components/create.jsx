import React, { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import ResponsiveUI from "./sideBar";

// Body of the page
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

//form import
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";

/*
TODO: User can select the model they want, the name of it,
      and the classes of detection. When pressed developed model
      the frontend send a request for flask to run the yolov8 model.
      The download bar should represent the actual download
       - A download button to download into personal device
       - When click develop model, button should deactivate
       - only until model complete, then download icon activate
*/

const drawerWidth = 200;

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#303f9f",
      contrastText: "#fff",
    },
    secondary: {
      main: "#82b1ff",
      contrastText: "#fff",
    },
  },
});

function CreateModel(props) {
  const [user] = useState(() => {
    const localUser = localStorage.getItem("ITEMS");
    if (localUser == null) return null;

    return JSON.parse(localUser);
  });

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(user));
  }, [user]);
  const [model, setModel] = React.useState("");

  const handleChange = (event) => {
    setModel(event.target.value);
  };
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const [value, setValue] = useState("");
  const handleLetter = (event) => {
    const newValue = event.target.value.replace(/[^a-zA-Z,]+/g, "");
    setValue(newValue);
  };

  const drawer = <ResponsiveUI />;
  const container =
    window !== undefined ? () => window().document.body : undefined;

  const [errorN, setErrorN] = useState(false);
  const [errorC, setErrorC] = useState(false);
  const [errorM, setErrorM] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (data.get("model") !== "") {
      setErrorM(false);
    }
    if (data.get("modelName") !== "") {
      setErrorN(false);
    }
    if (value !== "") {
      setErrorC(false);
    }
    if (data.get("modelName") === "") {
      setErrorN(true);
    }
    if (value === "") {
      setErrorC(true);
    }
    if (data.get("model") === "") {
      setErrorM(true);
    }

    const vari = {
      Name: data.get("modelName"),
      classes: value,
      model: data.get("model"),
      id: user.userID,
    };
    fetch("/api/createModel", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(vari),
    })
      .then((res) => res.json())
      .then((re) => {
        if (re.success === "true") {
          // Handle username already existing (e.g., set error state, display message)
          setErrorN(false);
          setErrorC(false);
          alert("model created succefully");
        } else {
          // Process the successful response normally
          setErrorN(true);
          setErrorC(true);
          alert("Invalid inputs, try again");
        }
      });
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <ThemeProvider theme={defaultTheme}>
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Your models
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onTransitionEnd={handleDrawerTransitionEnd}
            onClose={handleDrawerClose}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
      </ThemeProvider>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <ThemeProvider theme={defaultTheme}>
          <Toolbar />
          <div className="selection">
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <FormControl variant="filled" sx={{ m: 1, width: 200 }}>
                <InputLabel
                  error={errorM}
                  id="model-In"
                  sx={{ color: "white" }}
                  color="secondary"
                >
                  Model
                </InputLabel>
                <Select
                  labelId="model-label"
                  id="model"
                  value={model}
                  label="model"
                  name="model"
                  onChange={handleChange}
                  sx={{ color: "white" }}
                >
                  <MenuItem value={"yolov8s-world.pt"}>YOLOv8s-world </MenuItem>
                  <MenuItem value={"yolov8m-world.pt"}>YOLOv8m-world</MenuItem>
                  <MenuItem value={"yolov8l-world.pt"}>YOLOv8l-world</MenuItem>
                </Select>
              </FormControl>
              <TextField
                error={errorN}
                color="secondary"
                margin="normal"
                required
                fullWidth
                id="modelName"
                label="modelName"
                name="modelName"
                autoComplete="modelName"
                autoFocus
                sx={{
                  "& .MuiOutlinedInput-root": { color: "white" },
                }}
                focused
              />
              <TextField
                error={errorC}
                value={value}
                onChange={handleLetter}
                color="secondary"
                helperText="use [,] as separator"
                margin="normal"
                required
                fullWidth
                name="Classes "
                label="Classes"
                id="Classes"
                autoComplete="Classes"
                sx={{
                  "& .MuiOutlinedInput-root": { color: "white" },
                }}
                focused
              />

              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                color="secondary"
              >
                Create setting
              </Button>
            </Box>
          </div>
        </ThemeProvider>
      </Box>
    </Box>
  );
}

export default CreateModel;
