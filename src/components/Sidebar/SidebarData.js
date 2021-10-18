import HomeIcon from "@mui/icons-material/Home";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import EventIcon from "@mui/icons-material/Event";
import FavoriteIcon from "@mui/icons-material/Favorite";
import InfoIcon from "@mui/icons-material/Info";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export const navItems = [
  {
    text: "Home",
    path: "/",
    icon: <HomeIcon />,
  },
  {
    text: "Menu",
    path: "/menu",
    icon: <MenuBookIcon />,
  },

  {
    text: "Book a table",
    path: "/book",
    icon: <EventIcon />,
  },
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
    text: "About",
    path: "/about",
    icon: <InfoIcon />,
  },
];
