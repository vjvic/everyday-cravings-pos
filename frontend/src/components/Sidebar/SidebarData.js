import HomeIcon from "@mui/icons-material/Home";
/* import MenuBookIcon from "@mui/icons-material/MenuBook"; */
/* import EventIcon from "@mui/icons-material/Event"; */
import FavoriteIcon from "@mui/icons-material/Favorite";
import InfoIcon from "@mui/icons-material/Info";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HistoryIcon from "@mui/icons-material/History";
/* import DashboardIcon from "@mui/icons-material/Dashboard";
import AddIcon from "@mui/icons-material/Add";
import ListIcon from "@mui/icons-material/List"; */

export const navItems = [
  {
    text: "Home",
    path: "/",
    icon: <HomeIcon />,
  },
  /*  {
    text: "Menu",
    path: "/menu",
    icon: <MenuBookIcon />,
  }, */

  /*   {
    text: "Book a table",
    path: "/book",
    icon: <EventIcon />,
  }, */
  {
    text: " Cart",
    path: "/cart",
    icon: <ShoppingCartIcon />,
  },
  {
    text: "Favorites",
    path: "/favorites",
    icon: <FavoriteIcon />,
  },
  {
    text: "Order History",
    path: "/order-history",
    icon: <HistoryIcon />,
  },
  {
    text: "About",
    path: "/about",
    icon: <InfoIcon />,
  },
];

export const navItemsAdmin = [
  /*   {
    text: "Dashboard",
    path: "/dashboard",
    icon: <DashboardIcon />,
  },
  {
    text: "Add Meal",
    path: "/add-meal",
    icon: <AddIcon />,
  },
  {
    text: "Orders",
    path: "/orders",
    icon: <ListIcon />,
  }, */
];
