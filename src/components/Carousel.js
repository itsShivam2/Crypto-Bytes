import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Carousel.css";
import ReactLoading from "react-loading";

function Carousel() {
  const [trendingCoins, setTrendingCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const trendingUrl =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h";
  useEffect(() => {
    setLoading(true);
    axios
      .get(trendingUrl)
      .then((response) => {
        setTrendingCoins(response.data);
        setLoading(false);
        // console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const items = trendingCoins.map((trendingCoin) => {
    let percentChange = trendingCoin?.price_change_percentage_24h >= 0;

    return (
      <Link to={`/coin/${trendingCoin.id}`} className="carouselItem">
        {trendingCoin.image ? (
          <img
            className="trending-image"
            src={trendingCoin.image}
            alt={trendingCoin.name}
          />
        ) : null}
        <span className="trending-symbol">
          {trendingCoin?.symbol}
          &nbsp;
          <span
            className="trending-change"
            style={{
              color: percentChange > 0 ? "rgb(14, 203, 129)" : "red",
            }}
          >
            {percentChange && "+"}
            {trendingCoin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>
        <span className="trending-price">
          ₹{trendingCoin?.current_price.toLocaleString("en-IN")}
        </span>
      </Link>
    );
  });

  const responsive = {
    0: {
      items: 1,
    },
    450: {
      items: 2,
    },
    600: {
      items: 3,
    },
    1000: {
      items: 4,
    },
  };

  return loading ? (
    <div className="loading-container">
      <ReactLoading
        type="spinningBubbles"
        color="white"
        height={"20%"}
        width={"20%"}
      />
    </div>
  ) : (
    <div className="carousel">
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        autoPlay
        items={items}
        responsive={responsive}
        disableButtonsControls
        disableDotsControls
      />
    </div>
  );
}

export default Carousel;
