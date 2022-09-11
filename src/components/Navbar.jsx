import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import { ImSun } from "react-icons/im";
import { BsFillMoonFill } from "react-icons/bs";
import { Link, NavLink } from "react-router-dom";

function Navbar({ isLogged }) {
  const [navState, setNavState] = useState(false);
  const html = document.querySelector("html");
  html.addEventListener("click", () => setNavState(false));
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

              {!isLogged && (
                <li>
                  <NavLink
                    to="/login"
                    style={({ isActive }) =>
                      isActive ? { color: "blue" } : { color: "" }
                    }
                  >
                    Login/Reg
                  </NavLink>
                </li>
              )}
              {isLogged && (
                <li>
                  <NavLink
                    to="/login"
                    style={({ isActive }) =>
                      isActive ? { color: "blue" } : { color: "" }
                    }
                  >
                    LOGOUT
                  </NavLink>
                </li>
              )}
              {/* {isLogged && (
                <li>
                  <NavLink
                    to="/request"
                    style={({ isActive }) =>
                      isActive ? { color: "blue" } : { color: "" }
                    }
                  >
                    Request Book
                  </NavLink>
                </li>
              )} */}
              {isLogged && (
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
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
