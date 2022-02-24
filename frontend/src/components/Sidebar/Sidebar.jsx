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
import { navItems, userNavItems } from "./SidebarData";
import { useHistory, useLocation } from "react-router";
import { useSelector } from "react-redux";

const drawerWidth = 240;

const Sidebar = ({ window, mobileOpen, handleDrawerToggle }) => {
  const container =
    window !== undefined ? () => window().document.body : undefined;

  const history = useHistory();
  const location = useLocation();

  const activeColor = (path) => {
    return location.pathname === path ? "#F5F5F5" : null;
  };

  const navItemColor = (path) => {
    return location.pathname === path ? "#DE8538" : null;
  };

  const { order } = useSelector((state) => state.orderCashierDetails);
  const { userInfo } = useSelector((state) => state.userLogin);

  if (
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === `/cashier/receipt/${order ? order._id : " "}` ||
    location.pathname === `/cashier`
  )
    return "";

  const cashierRoute = userInfo && userInfo.role === "cashier";

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
          displayPrint: "none",
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
        {/* admin navitems */}
        {userInfo &&
          userInfo.role !== "user" &&
          navItems.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => history.push(item.path)}
              sx={{
                backgroundColor: activeColor(item.path),
                color: navItemColor(item.path),
              }}
            >
              <ListItemIcon sx={{ color: navItemColor(item.path) }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}

        {/* user navitems */}
        {userInfo &&
          userInfo.role === "user" &&
          userNavItems.map((item) => (
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
      </List>
    </div>
  );
  return (
    <Box
      component="nav"
      sx={{
        width: { sm: drawerWidth },
        flexShrink: { sm: 0 },
        displayPrint: "none",
        display: cashierRoute ? "none" : "block",
      }}
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
