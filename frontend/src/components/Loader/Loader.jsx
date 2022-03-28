import { Box, CircularProgress } from "@mui/material";
import { useLocation } from "react-router-dom";

const style = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "calc(100vh - 240px)",
};

const Loader = () => {
  const location = useLocation();

  const loginPath = location.pathname === "/login";

  return (
    <Box sx={style}>
      <CircularProgress sx={{ display: loginPath ? "none" : "block" }} />
    </Box>
  );
};

export default Loader;
