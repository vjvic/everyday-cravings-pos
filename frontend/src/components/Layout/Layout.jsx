import { useState } from "react";
import { Box, CssBaseline, Toolbar } from "@mui/material";
import { Appbar, Sidebar } from "..";
import { useSelector } from "react-redux";

const style = {
  flexGrow: 1,
  p: 3,
  overflowX: "hidden",
  height: "100vh",
};

const Layout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const { loading } = useSelector((state) => state.orderCashierDetails);

  return (
    <Box sx={{ display: loading ? "none" : "flex" }}>
      <CssBaseline />

      {/*  Appbar */}
      <Appbar handleDrawerToggle={handleDrawerToggle} />

      {/*  Drawer */}
      <Sidebar
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />

      {/*  Main */}

      <Box component="main" sx={style}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
