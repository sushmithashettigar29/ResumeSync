import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

function NavBar() {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAuth(false);
    navigate("/");
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  const navigateTo = (path) => {
    navigate(path);
    if (isMobile) setDrawerOpen(false);
  };

  const toggleDrawer = (open) => {
    setDrawerOpen(open);
  };

  const menuItems = [
    { label: "Home", path: "/home" },
    { label: "About", path: "/about" },
    { label: "Create Resume", path: "/create-resume" },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {isMobile ? (
            <>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={() => toggleDrawer(true)}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, fontWeight: "bold" }}
                onClick={() => navigateTo("/home")}
              >
                ResumeSync
              </Typography>
              <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={() => toggleDrawer(false)}
              >
                <List>
                  {menuItems.map((item, index) => (
                    <ListItem
                      button
                      key={index}
                      onClick={() => navigateTo(item.path)}
                    >
                      <ListItemText primary={item.label} />
                    </ListItem>
                  ))}
                  {auth && (
                    <>
                      <ListItem button onClick={handleProfile}>
                        <ListItemText primary="Profile" />
                      </ListItem>
                      <ListItem button onClick={handleLogout}>
                        <ListItemText primary="Logout" />
                      </ListItem>
                    </>
                  )}
                </List>
              </Drawer>
            </>
          ) : (
            <>
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, fontWeight: "bold" }}
                onClick={() => navigateTo("/home")}
              >
                ResumeSync
              </Typography>
              {menuItems.map((item, index) => (
                <Typography
                  key={index}
                  variant="h6"
                  component="div"
                  marginRight={5}
                  sx={{ fontWeight: "bold", cursor: "pointer" }}
                  onClick={() => navigateTo(item.path)}
                >
                  {item.label}
                </Typography>
              ))}
              {auth && (
                <div>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleProfile}>Profile</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Menu>
                </div>
              )}
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavBar;
