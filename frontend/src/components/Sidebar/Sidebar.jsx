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
import { useHistory, useLocation } from "react-router";
import { useSelector } from "react-redux";

const drawerWidth = 240;

const Sidebar = ({ window, mobileOpen, handleDrawerToggle }) => {
  const container =
    window !== undefined ? () => window().document.body : undefined;

  const history = useHistory();
  const location = useLocation();

  /*   const { order } = useSelector((state) => state.orderDetails); */
  const { userInfo } = useSelector((state) => state.userLogin);

  const activeColor = (path) => {
    return location.pathname === path ? "#F5F5F5" : null;
  };
  /* 
  if (location.pathname === "/login" || location.pathname === "/register")
    return ""; */

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
          src="/images/logo.png"
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
            sx={{
              backgroundColor: activeColor(item.path),
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}

        {userInfo && userInfo.isAdmin && <Divider />}

        {userInfo &&
          userInfo.isAdmin &&
          navItemsAdmin.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => history.push(item.path)}
              /* className={location.pathname === item.path ? classes.active : null} */
              sx={{
                backgroundColor: activeColor(item.path),
              }}
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
