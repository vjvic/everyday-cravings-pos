import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Button,
  Menu,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { Box } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Search, SearchIconWrapper, StyledInputBase } from "./styles";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import PersonIcon from "@mui/icons-material/Person";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Link } from "react-router-dom";
import { logout } from "redux/actions/userActions";

const Appbar = ({ handleDrawerToggle }) => {
  const [query, setQuery] = useState("");

  const history = useHistory();

  const dispatch = useDispatch();

  const { loading, userInfo } = useSelector((state) => state.userLogin);
  const { cartItems } = useSelector((state) => state.cart);

  const drawerWidth = 240;

  const handleSearch = (e) => {
    e.preventDefault();

    if (query) {
      history.push("/results/" + query);
      setQuery("");
    }
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutHandler = () => {
    dispatch(logout());
  };

  //Total cart items
  const total = cartItems.reduce((acc, item) => acc + item.qty, 0);

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
      elevation={0}
      color="secondary"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
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

        <form onSubmit={handleSearch}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </Search>
        </form>

        <Box sx={{ flexGrow: 1 }} />

        <Box px={2}>
          <IconButton
            size="large"
            color="inherit"
            onClick={() => history.push("/cart")}
          >
            <Badge badgeContent={total} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Box>

        {userInfo ? (
          <div>
            <Button
              onClick={handleMenu}
              color="inherit"
              endIcon={<ArrowDropDownIcon />}
            >
              {userInfo.name}
            </Button>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose} component={Link} to="/profile">
                Profile
              </MenuItem>
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </Menu>
          </div>
        ) : (
          <Button
            variant="outlined"
            startIcon={<PersonIcon />}
            component={Link}
            to="/login"
          >
            Sign in
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;
