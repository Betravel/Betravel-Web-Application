import React, { useState } from "react";
import Logo from "../../assets/betravellogo.jpg";
import { Link } from "react-router-dom";
import "./Navbar.css";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import ReorderSharpIcon from "@mui/icons-material/ReorderSharp";

function Navbar() {
  const [openLinks, setOpenLinks] = useState(false);

  const toggleNavbar = () => {
    setOpenLinks(!openLinks);
  };

  return (
    <div className="navbar">
      <div className="leftSide" id={openLinks ? "open" : "close"}>
        <img src={Logo} alt="" />
        <div className="hiddenLinks">
          <Link to="/"> Home </Link>
          <Link to="/about"> About </Link>
          <Link to="/contact"> Contact </Link>
          <Link to="/profil"> Profil </Link>
          <Link to="/SignUp"> Sign Up </Link>
          <Link to="/SignIn"> Sign In </Link>
        </div>
      </div>

      <div className="rightSide">
        <Link to="/"> Home </Link>
        <Link to="/about"> About </Link>
        <Link to="/contact"> Contact </Link>
        <Link to="/profil"> Profil </Link>
        <Link to="/SignUp"> Sign Up </Link>
        <Link to="/SignIn"> Sign In </Link>
        <div className="socialMedia">
          <Link to="">
            {" "}
            <FacebookIcon />
            <InstagramIcon />
          </Link>
        </div>
        <button onClick={toggleNavbar}>
          <ReorderSharpIcon />
        </button>
      </div>
    </div>
  );
}

export default Navbar;
