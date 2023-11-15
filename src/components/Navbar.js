import React from "react";
import "./Navbar.css";
import { facoins } from "react-icons/fa";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <Link to="/">
      <div className="navbar">
        <h2 className="navbar-heading">
          Crypto <span className="navbar-heading-span">Bytes</span>
        </h2>
      </div>
    </Link>
  );
}

export default Navbar;
