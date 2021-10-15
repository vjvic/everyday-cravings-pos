import HomeIcon from "@mui/icons-material/Home";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import EventIcon from "@mui/icons-material/Event";
import FavoriteIcon from "@mui/icons-material/Favorite";

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
    text: "Favorites",
    path: "/favorites",
    icon: <FavoriteIcon />,
  },
];
