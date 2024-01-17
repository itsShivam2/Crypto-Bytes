import React from "react";
import { FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";
import "./Footer.css";
function Footer() {
  return (
    <div className="footer-section">
      <div className="social">
        <div>
          <a href="#">
            <FaYoutube />
          </a>
        </div>
        <div>
          <a href="#">
            <FaTwitter />
          </a>
        </div>
        <div>
          <a href="#">
            <RiInstagramFill />
          </a>
        </div>
        <div>
          <a href="#">
            <FaFacebook />
          </a>
        </div>
      </div>
      <div className="copyright">
        <h2> CRYPTO BYTES</h2>
        <h3>&copy; Copyright 2022</h3>
        <h3>
          All rights reserved by <i>Shivam Gupta</i>{" "}
        </h3>
      </div>
    </div>
  );
}

export default Footer;
