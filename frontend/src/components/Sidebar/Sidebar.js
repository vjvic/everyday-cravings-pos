import React from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Drawer,
  Box,
} from "@mui/material";
import { navItems, navItemsAdmin } from "./SidebarData";
import { useHistory } from "react-router";
import { useLocation } from "react-router";
import logo from "assets/image/logo.png";

const drawerWidth = 240;

const Sidebar = ({ window, mobileOpen, handleDrawerToggle }) => {
  const container =
    window !== undefined ? () => window().document.body : undefined;

  const history = useHistory();
  const location = useLocation();

  if (location.pathname === "/login" || location.pathname === "/register")
    return "";

  const drawer = (
    <div>
      {/*   <Toolbar /> */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 2,
          gridGap: 10,
        }}
      >
        <img
          src={logo}
          alt="logo"
          width="50px"
          style={{ borderRadius: 1000 }}
        />
        <Box>
          <Typography component="h1" variant="h5" fontWeight="bold">
            Everyday
          </Typography>
          <Typography
            variant="body"
            fontWeight="bold"
            sx={{ color: "#DE8538" }}
          >
            Cravings
          </Typography>
        </Box>
      </Box>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => history.push(item.path)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
        {/* <Divider /> */}

        {navItemsAdmin.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => history.push(item.path)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
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
  );
};

export default Sidebar;
