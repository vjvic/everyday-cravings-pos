import React from "react";
import { Box, CssBaseline, Toolbar } from "@mui/material";
import { Appbar, Sidebar } from "..";

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
      <Sidebar
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />

      {/*  Main */}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          overflowX: "hidden",
          height: "100vh",
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
