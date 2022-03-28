import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useSelector, useDispatch } from "react-redux";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Link } from "react-router-dom";
import { logout } from "../../redux/actions/userActions";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { useLocation } from "react-router";
import { FaCashRegister } from "react-icons/fa";
import { Loader } from "../../components";

const drawerWidth = 240;

const Appbar = ({ handleDrawerToggle }) => {
  const location = useLocation();
  const dispatch = useDispatch();

  const { loading, userInfo } = useSelector((state) => state.userLogin);

  const cashierRoute = userInfo && userInfo.role === "cashier";
  const loginRoute = location.pathname === "/login";
  const registerRoute = location.pathname === "/register";

  const appBar = {
    width: {
      sm: cashierRoute ? "100%" : `calc(100% - ${drawerWidth}px)`,
    },
    ml: { sm: `${drawerWidth}px` },
    backgroundColor: "#f9f9f9",
    displayPrint: "none",
    borderBottom: "1px solid rgba(0,0,0,0.1)",
    display: loginRoute || registerRoute ? "none" : "block",
  };

  const logoutHandler = () => {
    dispatch(logout());
  };

  if (loading) return <Loader />;

  return (
    <AppBar position="fixed" elevation="0" sx={appBar}>
      <Toolbar>
        <IconButton
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>

        {cashierRoute && (
          <Typography variant="h5" color="primary">
            <FaCashRegister /> Cashier
          </Typography>
        )}

        <Box sx={{ flexGrow: 1 }} />

        {userInfo && (
          <PopupState variant="popover">
            {(popupState) => (
              <React.Fragment>
                <Button
                  endIcon={<ArrowDropDownIcon />}
                  {...bindTrigger(popupState)}
                >
                  {userInfo.name}
                </Button>
                <Menu {...bindMenu(popupState)}>
                  <MenuItem
                    onClick={popupState.close}
                    component={Link}
                    to="/profile"
                  >
                    Profile
                  </MenuItem>

                  <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                </Menu>
              </React.Fragment>
            )}
          </PopupState>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;
