import React from "react";
import "./Navbar.css";
import { facoins } from "react-icons/fa";
import { Link } from "react-router-dom";


function Navbar() {
  return (
    <Link to="/">
      <div className="navbar">
        <h1 className="title">
          Crypto <span className="purple">Bytes</span>
        </h1>
      </div>
    </Link>
  );
}

export default Navbar;
