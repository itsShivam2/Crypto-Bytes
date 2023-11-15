import React, { useState, useEffect } from "react";
import CoinCard from "./CoinCard";
import "./Home.css";
import News from "./News";
import axios from "axios";

function Home(props) {
  return (
    <div className="container">
      <div className="coin-section">
        <CoinCard coins={props.coins} />
      </div>

      <div className="news-section">
        <News news={props.news} />
      </div>
    </div>
  );
}

export default Home;
