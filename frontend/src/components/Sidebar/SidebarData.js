import DashboardIcon from "@mui/icons-material/Dashboard";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AssessmentIcon from "@mui/icons-material/Assessment";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { FaCashRegister } from "react-icons/fa";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HistoryIcon from "@mui/icons-material/History";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

export const navItems = [
  {
    text: "Home",
    path: "/",
    icon: <HomeIcon />,
  },

  {
    text: " Cart",
    path: "/cart",
    icon: <ShoppingCartIcon />,
  },
  {
    text: "Order History",
    path: "/order-history",
    icon: <HistoryIcon />,
  },
];

export const navItemsAdmin = [
  {
    text: "Dashboard",
    path: "/admin/dashboard",
    icon: <DashboardIcon />,
  },
  {
    text: "Meal list",
    path: "/admin/meals",
    icon: <ListAltIcon />,
  },
  {
    text: "User List",
    path: "/admin/user-list",
    icon: <PeopleAltIcon />,
  },
  {
    text: "Menu",
    path: "/admin/menu",
    icon: <MenuBookIcon />,
  },
  {
    text: "Cashier",
    path: "/admin/cashier",
    icon: <FaCashRegister />,
  },
  {
    text: "Sales Report",
    path: "/admin/sales-report",
    icon: <AssessmentIcon />,
  },
];
