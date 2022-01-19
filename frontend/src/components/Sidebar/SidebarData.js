import DashboardIcon from "@mui/icons-material/Dashboard";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AssessmentIcon from "@mui/icons-material/Assessment";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { FaCashRegister } from "react-icons/fa";
import HomeIcon from "@mui/icons-material/Home";
/* import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HistoryIcon from "@mui/icons-material/History"; */
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import {
  MdBreakfastDining,
  MdLunchDining,
  MdDinnerDining,
} from "react-icons/md";
import { GiCupcake } from "react-icons/gi";
import { BiDrink } from "react-icons/bi";
import { FiPackage } from "react-icons/fi";
import { HiOutlineClipboardList } from "react-icons/hi";

export const navItems = [
  {
    text: "Home",
    path: "/",
    icon: <HomeIcon />,
  },
  {
    text: "Breakfast",
    path: "/category/breakfast",
    icon: <MdBreakfastDining />,
  },
  {
    text: "Lunch",
    path: "/category/lunch",
    icon: <MdLunchDining />,
  },
  {
    text: "Dinner",
    path: "/category/dinner",
    icon: <MdDinnerDining />,
  },
  {
    text: "Dessert",
    path: "/category/dessert",
    icon: <GiCupcake />,
  },
  {
    text: "Drinks",
    path: "/category/drinks",
    icon: <BiDrink />,
  },
  {
    text: "My Orders",
    path: "/my-orders",
    icon: <FiPackage />,
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
    text: "Order List",
    path: "/admin/order-list",
    icon: <HiOutlineClipboardList />,
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

/* export const category = [

]; */
