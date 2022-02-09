import React, { useEffect, useState } from "react";
import Logo from "../../assets/betravel.png";
import { BrowserRouter, Link, useNavigate } from "react-router-dom";

import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import ReorderSharpIcon from "@mui/icons-material/ReorderSharp";

function Navbar() {
  const history = useNavigate();

  const logout = () => {
    sessionStorage.clear();

    history("/");
    window.location.reload(false);
  };
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light "
      style={{ backgroundColor: "#07002a" }}
    >
      <div className="container-fluid">
        <div className="col-lg-6">
          <a className="navbar-brand" href="/">
            <img src={Logo} alt="" />
          </a>
        </div>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{ backgroundColor: "white" }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className="btn active"
                to="/"
                style={{ color: "white", fontSize: "25px" }}
              >
                {" "}
                Home{" "}
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/about"
                className="btn"
                style={{ color: "white", fontSize: "25px" }}
              >
                {" "}
                About{" "}
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/contact"
                className="btn"
                style={{ color: "white", fontSize: "25px" }}
              >
                {" "}
                Contact{" "}
              </Link>
            </li>
            <li className="nav-item dropdown">
              <button
                className="btn dropdown-toggle"
                id="navbarDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ color: "white", fontSize: "25px" }}
              >
                Profil
              </button>
              {sessionStorage.getItem("log") ? (
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <Link to="/profil" className="dropdown-item">
                      {" "}
                      Profil{" "}
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={logout}>
                      Logout
                    </button>
                  </li>
                </ul>
              ) : (
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <Link to="/SignIn" className="dropdown-item">
                      {" "}
                      Sign In{" "}
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link to="/SignUp" className="dropdown-item">
                      {" "}
                      Sign Up{" "}
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <button className="btn" style={{ color: "white" }}>
                <FacebookIcon />
              </button>
              <button className="btn" style={{ color: "white" }}>
                <InstagramIcon />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
