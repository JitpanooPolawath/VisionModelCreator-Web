import React, { useState, useEffect } from "react";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import AddIcon from "@mui/icons-material/Add";

export default function ResponsiveUI() {
  const [user, setUser] = useState(() => {
    const localUser = localStorage.getItem("ITEMS");
    if (localUser == null) return null;

    return JSON.parse(localUser);
  });

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(user));
  }, [user]);
  return (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {[user.username, "Create"].map((text, index) => (
          <ListItem key={text} disablePadding s>
            {index === 0 ? (
              <ListItemButton href="/profile">
                <ListItemIcon>
                  <AccountCircleIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            ) : (
              <ListItemButton href="/create">
                <ListItemIcon>
                  <AddIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            )}
          </ListItem>
        ))}
      </List>
      <Divider />
      <List sx={{ position: "absolute", bottom: 0, width: "100%" }}>
        {["Logout"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton href="/logout">
              <ListItemIcon>
                <LogoutIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
}
