import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { logout_user } from "../features/user/isLogged";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

function Navbar() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(false);
  };
  /*************************** */
  const [navState, setNavState] = useState(false);
  const [users, setUsers] = useState([]);
  const isLogged = useSelector((state) => state.isLogged.loggedIn);
  const getUsrName = useSelector((state) => state.isLogged.usr_name);
  const isAdmin = useSelector((state) => state.isLogged.isAdmin);
  const dispatch = useDispatch();
  const html = document.querySelector("html");
  html.addEventListener("click", () => setNavState(false));

  // const UserName = users.find((usr) => {
  //   return usr.fname === fname;
  // });

  const user_logOut = () => {
    dispatch(logout_user());
    navigate("/");
  };

  const toDashboard = () => {
    navigate("user-dashboard");
  };

  return (
    <nav>
      <div className="container py-3 mx-3">
        <div className="brand">
          <span>HKM</span>
          <span className="dot">.</span>
        </div>
        <div className="links-container" onClick={(e) => e.stopPropagation()}>
          <div className={`links ${navState ? "responsive-toggle" : ""}`}>
            <ul>
              <li>
                <NavLink
                  to="/"
                  style={({ isActive }) =>
                    isActive ? { color: "blue" } : { color: "" }
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  style={({ isActive }) =>
                    isActive ? { color: "blue" } : { color: "" }
                  }
                >
                  Contact
                </NavLink>
              </li>

              {isLogged && !isAdmin && (
                <li>
                  <NavLink
                    to="/sell"
                    style={({ isActive }) =>
                      isActive ? { color: "blue" } : { color: "" }
                    }
                  >
                    Sell Book
                  </NavLink>
                </li>
              )}

              {!isLogged && !isAdmin && (
                <li>
                  <NavLink
                    to="/userLogin"
                    style={({ isActive }) =>
                      isActive ? { color: "blue" } : { color: "orange" }
                    }
                  >
                    Login
                  </NavLink>
                </li>
              )}

              {isAdmin && (
                <li>
                  <Button
                    variant="outlined"
                    onClick={() => navigate("/dashboard")}
                  >
                    Dashboard
                  </Button>
                </li>
              )}

              {isLogged && !isAdmin && (
                <li>
                  <div>
                    <Button
                      id="usr-btn"
                      aria-controls={open ? "usr-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={handleClick}
                      variant="contained"
                      endIcon={<KeyboardArrowDownIcon />}
                    >
                      {getUsrName}
                    </Button>
                    <Menu
                      id="usr-menu"
                      anchorEl={anchorEl}
                      open={open}
                      keepMounted
                      getContentAnchorEl={null}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "left",
                      }}
                      MenuListProps={{
                        "aria-labelledby": "usr-btn",
                      }}
                    >
                      <MenuItem onClick={handleClose}>Profile</MenuItem>
                      <MenuItem onClick={toDashboard}>My account</MenuItem>
                      <MenuItem onClick={user_logOut}>Logout</MenuItem>
                    </Menu>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
