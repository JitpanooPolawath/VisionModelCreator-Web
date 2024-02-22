import React, { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import ResponsiveUI from "./sideBar";

// Body of the page
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

// Data and table
import { DataGrid } from "@mui/x-data-grid";
import DownloadIcon from "@mui/icons-material/Download";

const drawerWidth = 200;

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#303f9f",
      contrastText: "#fff",
    },
    secondary: {
      main: "#9cffff",
      contrastText: "#fff",
    },
  },
});

/*
TODO: check if user is login, if so show the dashboard, and all the models
      show download button next to each model to download it. 
      Somehow connect the buttons to model storage.
      if user not login, redirect them to the login page
*/

function Profile(props) {
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

  const [models, setModels] = useState("");
  const [disable, setDisable] = useState(false);

  function handleButton(index) {
    setDisable(true);
    const vari = {
      Name: index.Name,
      classes: index.Classes,
      model: index.Model,
      actID: index.Download,
    };
    fetch("/api/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(vari),
    });
    fetch("/api/buildModel", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(vari),
    })
      .then((res) => res.json())
      .then((re) => {
        if (re.success === "true") {
          // Handle username already existing (e.g., set error state, display message)
          alert("model created succefully");
          const a = document.createElement("a");
          a.href =
            "http://localhost:5000/download/" +
            index.Name +
            index.Download +
            ".pt";
          a.click();
          setDisable(false);
        } else {
          // Process the successful response normally
          setDisable(false);
          alert("Invalid inputs, try again");
        }
      });
  }

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "Name", headerName: "Name", width: 130 },
    { field: "Classes", headerName: "Classes", width: 130 },
    { field: "Model", headerName: "Model", width: 130 },
    {
      field: "Download",
      headerName: "Download",
      width: 100,
      renderCell: (params) => {
        const { row } = params; // Access row data and index
        // console.log(row);

        const { id } = row; // Assuming a unique identifier exists
        return (
          <Button
            disabled={disable}
            key={id}
            variant="contained"
            onClick={() => handleButton(row)}
            value
          >
            <DownloadIcon />
          </Button>
        );
      },
    },
  ];

  const drawer = <ResponsiveUI />;
  const container =
    window !== undefined ? () => window().document.body : undefined;

  const [user] = useState(() => {
    const localUser = localStorage.getItem("ITEMS");
    if (localUser == null) return null;

    return JSON.parse(localUser);
  });

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    fetch("/api/viewModel", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((re) => {
        if (re.success === "true") {
          setModels(re.models);
        }
      });
  }, [user]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
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
              My models
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
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Toolbar />
          <div style={{ height: 320, width: "100%" }}>
            <DataGrid
              rows={models}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              marginTop: "100px",
            }}
          >
            <Link to="/create">
              <Button variant="contained" color="primary">
                Create Model
              </Button>
            </Link>
          </div>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Profile;
