import React from "react";
import { Box, CssBaseline, Toolbar } from "@mui/material";
import Appbar from "components/Appbar/Appbar";
import Siderbar from "components/Sidebar/Sidebar";

const Layout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/*  Appbar */}
      <Appbar handleDrawerToggle={handleDrawerToggle} />

      {/*  Drawer */}
      <Siderbar
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />

      {/*  Main */}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          /* background: "#F9F9F9", */
          overflowX: "hidden",
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
