import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Toolbar,
  IconButton,
  /* Badge, */
  Button,
  Menu,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { Box } from "@mui/system";
/* import SearchIcon from "@mui/icons-material/Search"; */
/* import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"; */
/* import { Search, SearchIconWrapper, StyledInputBase } from "./styles"; */
/* import { useHistory } from "react-router"; */
import { useSelector, useDispatch } from "react-redux";
/*  import PersonIcon from "@mui/icons-material/Person";  */
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Link } from "react-router-dom";
import { logout } from "../../redux/actions/userActions";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { useLocation } from "react-router";

const Appbar = ({ handleDrawerToggle }) => {
  /*  const [keyword, setKeyword] = useState("");

  const history = useHistory(); */
  const location = useLocation();

  const dispatch = useDispatch();

  const { loading, userInfo } = useSelector((state) => state.userLogin);
  /* const { cartItems } = useSelector((state) => state.cart); */

  const drawerWidth = 240;

  /* const handleSearch = (e) => {
    e.preventDefault();

    if (keyword) {
      history.push("/results/" + keyword);
      setKeyword("");
    }
  }; */

  const logoutHandler = () => {
    dispatch(logout());
  };

  //Total cart items
  /* const total = cartItems.reduce((acc, item) => acc + item.qty, 0); */

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

  if (location.pathname === "/login" || location.pathname === "/register")
    return "";

  return (
    <AppBar
      position="fixed"
      elevation={0}
      color="secondary"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        backgroundColor: "#f9f9f9",
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

        {/*  <form onSubmit={handleSearch}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </Search>
        </form> */}

        <Box sx={{ flexGrow: 1 }} />
        {/* 
        <Box>
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
 */}
        {userInfo && (
          <PopupState variant="popover">
            {(popupState) => (
              <React.Fragment>
                <Button
                  endIcon={<ArrowDropDownIcon />}
                  color="inherit"
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
