import React from "react";
import Logo from "../../assets/betravellogo.jpg";
import { Link } from "react-router-dom";
import "./Navbar.css";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";

function Navbar() {
  return (
    <div className="navbar">
      <div className="leftSide">
        <img src={Logo} alt="" />
      </div>
      <div className="rightSide">
        <Link to="/"> Home </Link>
        <Link to="/about"> About </Link>
        <Link to="/contact"> Contact </Link>
        <Link to="/profil"> Profil </Link>
        <Link to="/SignUp"> Sign up  </Link>
        <div className="socialMedia">
          <Link to="">
            {" "}
            <FacebookIcon />
            <InstagramIcon />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
