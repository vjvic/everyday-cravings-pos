import DashboardIcon from "@mui/icons-material/Dashboard";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AssessmentIcon from "@mui/icons-material/Assessment";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import GroupIcon from "@mui/icons-material/Group";
import { FaCashRegister } from "react-icons/fa";

export const navItems = [
  {
    text: "Dashboard",
    path: "/",
    icon: <DashboardIcon />,
  },
  {
    text: "Meal list",
    path: "/admin/meals",
    icon: <ListAltIcon />,
  },
  {
    text: "User list",
    path: "/admin/user-list",
    icon: <GroupIcon />,
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
