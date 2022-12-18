import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../../dashboard/context/darkModeContext";
import { useContext } from "react";
import { useDispatch } from "react-redux";

const SideBar = () => {
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/user-dashboard" style={{ textDecoration: "none" }}>
          <span className="logo">My Profile</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">Account Info</p>
          <Link to="/user-dashboard" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Edit Account</span>
            </li>
          </Link>
          <Link
            to="/user-dashboard/reset-userPassword"
            style={{ textDecoration: "none" }}
          >
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Password</span>
            </li>
          </Link>
          <Link
            to="/user-dashboard/userBooks"
            style={{ textDecoration: "none" }}
          >
            <li>
              <StoreIcon className="icon" />
              <span>My Books</span>
            </li>
          </Link>

          <p className="title">USER</p>

          <Link to="/" style={{ textDecoration: "none" }}>
            <li>
              <ExitToAppIcon className="icon" />
              <span>Logout</span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
