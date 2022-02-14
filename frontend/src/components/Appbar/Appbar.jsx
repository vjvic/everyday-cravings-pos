import React /* , { useState } */ from "react";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Menu,
  MenuItem,
  CircularProgress,
  Badge,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Link } from "react-router-dom";
import { logout } from "../../redux/actions/userActions";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { useLocation } from "react-router";
import { FaCashRegister } from "react-icons/fa";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { NavItem } from "./styles";

const Appbar = ({ handleDrawerToggle }) => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const { loading, userInfo } = useSelector((state) => state.userLogin);
  const { cartItems } = useSelector((state) => state.cart);

  //Total cart items
  const total = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const cashierRoute = userInfo && userInfo.role === "cashier";
  const userRoute = userInfo && userInfo.role === "user";

  const drawerWidth = 240;

  const logoutHandler = () => {
    dispatch(logout());
  };

  const { order } = useSelector((state) => state.orderCashierDetails);

  if (
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === `/cashier/receipt/${order ? order._id : " "}`
  )
    return "";

  const locationPath = location.pathname;

  if (loading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "calc(100vh - 240px)",
        }}
      >
        <CircularProgress />
      </Box>
    );

  return (
    <AppBar
      position="fixed"
      elevation={cashierRoute ? 1 : 0}
      color={cashierRoute ? "primary" : "secondary"}
      sx={{
        width: {
          sm: cashierRoute ? "100%" : `calc(100% - ${drawerWidth}px)`,
        },
        ml: { sm: `${drawerWidth}px` },
        backgroundColor: cashierRoute ? "" : "#f9f9f9",
        displayPrint: "none",
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>

        {cashierRoute && (
          <Typography variant="h5">
            <FaCashRegister /> Cashier
          </Typography>
        )}

        <Box sx={{ flexGrow: 1 }} />

        <Box
          sx={{
            display: cashierRoute ? "block" : "none",
            color: "#fff",
            marginRight: 4,
          }}
        >
          <NavItem
            to="/cashier"
            style={{
              borderBottom:
                locationPath === "/cashier" ? "2px solid #fff" : "none",
            }}
          >
            Cashier
          </NavItem>
          <NavItem
            to="/order-list"
            style={{
              borderBottom:
                locationPath === "/order-list" ? "2px solid #fff" : "none",
            }}
          >
            Order-List
          </NavItem>
        </Box>

        <Box sx={{ display: userRoute ? "block" : "none" }}>
          <IconButton
            sx={{ color: "#212121" }}
            size="large"
            onClick={() => history.push("/cart")}
          >
            <Badge badgeContent={total} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Box>

        {userInfo ? (
          <PopupState variant="popover">
            {(popupState) => (
              <React.Fragment>
                <Button
                  endIcon={<ArrowDropDownIcon />}
                  sx={{ color: cashierRoute ? "inherit" : "#212121" }}
                  {...bindTrigger(popupState)}
                >
                  {userInfo.name}
                </Button>
                <Menu {...bindMenu(popupState)}>
                  {userInfo && userInfo.role === "admin" && (
                    <MenuItem
                      onClick={popupState.close}
                      component={Link}
                      to="/profile"
                    >
                      Profile
                    </MenuItem>
                  )}
                  <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                </Menu>
              </React.Fragment>
            )}
          </PopupState>
        ) : (
          <Button
            color="primary"
            variant="outlined"
            onClick={() => history.push("/login")}
          >
            login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;
