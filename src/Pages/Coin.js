import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import DOMPurify from "dompurify";
import "./Coin.css";
import { FiExternalLink } from "react-icons/fi";
import { FaSquareFacebook, FaTwitter } from "react-icons/fa6";
import Carousel from "../components/Carousel/Carousel";
import ReactLoading from "react-loading";
import ChartComponent from "../components/ChartComponent/ChartComponent";

function Coin() {
  const params = useParams();

  const [coin, setCoin] = useState({});

  const [loading, setLoading] = useState(false);

  const [selectedTimeRange, setSelectedTimeRange] = useState("24h");

  const url = `https://api.coingecko.com/api/v3/coins/${params.coinId}`;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setLoading(true);
    axios
      .get(url)
      .then((res) => {
        setCoin(res.data);
        // console.log(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [params.coinId]);

  const handleTimeRangeClick = (timeRange) => {
    setSelectedTimeRange(timeRange);
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
    <div className="coin-container">
      <div className="content">
        <div className="rank">
          <span className="rank-btn">Rank #{coin.market_cap_rank}</span>
        </div>

        <div className="icon-name-div">
          {coin.image ? <img src={coin.image.small} /> : null}
          <h1 className="coin-name">{coin.name}</h1>
        </div>
      </div>

      <div className="content">
        <div className="coin-price-update">
          <h3 className="coin-price-update-head trending-coins-head color-text-heading">
            Price{" "}
            <span className="trending-coins-heading-span color-text-span">
              Update
            </span>
          </h3>

          <p>
            <b>{coin.name}</b> price is{" "}
            <b>
              {" "}
              {coin.market_data?.current_price ? (
                <span>₹{coin.market_data.current_price.inr}</span>
              ) : null}
            </b>
            . The last 24 hours price change is{" "}
            <b>
              {coin.market_data?.price_change_percentage_24h_in_currency ? (
                <span>
                  {coin.market_data.price_change_percentage_24h_in_currency.inr.toFixed(
                    2
                  )}
                  %
                </span>
              ) : null}
            </b>
            , and the live market cap is{" "}
            <b>
              {coin.market_data?.market_cap ? (
                <span>₹{coin.market_data.market_cap.inr}</span>
              ) : null}
            </b>
            . It has circulating supply volume of{" "}
            <b>
              {coin.market_data?.circulating_supply ? (
                <span>{coin.market_data.circulating_supply}</span>
              ) : null}
            </b>{" "}
            <b>{coin.symbol}</b> coins and a max. supply volume of{" "}
            <b>
              {coin.market_data?.total_supply ? (
                <span>{coin.market_data.total_supply}</span>
              ) : null}
            </b>{" "}
            alongside{" "}
            <b>
              {coin.market_data?.total_volume ? (
                <span>₹{coin.market_data.total_volume.inr}</span>
              ) : null}
            </b>{" "}
            24h trading volume.
          </p>
        </div>
      </div>

      <div className="content">
        <div className="info-chart-div">
          <div className="info-div">
            <div className="icon-name-symbol-div">
              {coin.image ? <img src={coin.image.small} /> : null}
              <h1>{coin.name}</h1>
              <span>{coin.symbol}</span>
            </div>
            <div className="price-24h-div">
              <div className="price-24h-head-div">
                <span
                  className="statistics-head"
                  style={{ width: "50%", textAlign: "left" }}
                >
                  Price
                </span>

                {coin.market_data?.price_change_percentage_24h_in_currency ? (
                  coin.market_data.price_change_percentage_24h_in_currency.inr <
                  0 ? (
                    <div className="statistics-head-red">
                      <div
                        style={{
                          backgroundColor: "#D6436E40",
                          color: "#D6436E",
                        }}
                      >
                        {" "}
                        <span className="statistics-head-24h">
                          {coin.market_data.price_change_percentage_24h_in_currency.inr.toFixed(
                            2
                          )}
                          %
                        </span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="24"
                          height="16"
                          fill="red"
                        >
                          <path d="M12 21l-12-18h24z" />
                        </svg>
                      </div>
                    </div>
                  ) : (
                    <div className="statistics-head-green">
                      <div
                        style={{
                          backgroundColor: "#25DA7240",
                          color: "#00fd00",
                        }}
                      >
                        <span className="statistics-head-24h">
                          {coin.market_data.price_change_percentage_24h_in_currency.inr.toFixed(
                            2
                          )}
                          %
                        </span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="24"
                          height="16"
                          fill="#00fd00"
                        >
                          <path d="M12 3l12 18h-24z" />
                        </svg>
                      </div>
                    </div>
                  )
                ) : null}
              </div>
              {coin.market_data?.current_price ? (
                <h2 className="coin-price">
                  ₹{coin.market_data.current_price.inr}
                </h2>
              ) : null}
            </div>
            <div className="statistics-div">
              <div className="statistics-left-div">
                <span className="statistics-head">24 Hour High</span>
                {coin.market_data?.high_24h ? (
                  <h2 className="statistics-data">
                    ₹{coin.market_data.high_24h.inr}
                  </h2>
                ) : null}
              </div>
              <div className="statistics-right-div">
                <span className="statistics-head">24 Hour Low</span>
                {coin.market_data?.low_24h ? (
                  <h2 className="statistics-data">
                    ₹{coin.market_data.low_24h.inr}
                  </h2>
                ) : null}
              </div>
            </div>
            <div className="statistics-div">
              <div className="statistics-left-div">
                <span className="statistics-head">Market Cap</span>
                {coin.market_data?.market_cap ? (
                  <h2 className="statistics-data">
                    ₹{coin.market_data.market_cap.inr.toString().slice(0, -6)}M
                  </h2>
                ) : null}
              </div>
              <div className="statistics-right-div">
                <span className="statistics-head">Total Volume</span>
                {coin.market_data?.total_volume ? (
                  <h2 className="statistics-data">
                    ₹{coin.market_data.total_volume.inr.toString().slice(0, -6)}
                    M
                  </h2>
                ) : null}
              </div>
            </div>
            <div className="statistics-div">
              <div className="statistics-left-div">
                <span className="statistics-head">Circulating Supply</span>
                {coin.market_data?.circulating_supply ? (
                  <h2 className="statistics-data">
                    {coin.market_data.circulating_supply
                      .toString()
                      .slice(0, -6)}
                    M
                  </h2>
                ) : null}
              </div>
              <div className="statistics-right-div">
                <span className="statistics-head">Total Supply</span>
                {coin.market_data?.total_supply ? (
                  <h2 className="statistics-data">
                    {coin.market_data.total_supply.toString().slice(0, -6)}M
                  </h2>
                ) : null}
              </div>
            </div>
          </div>
          <div className="chart-div">
            <div className="chart">
              {/* <ChartComponent coinId={params.coinId} /> */}
              <ChartComponent
                coinId={params.coinId}
                timeRange={selectedTimeRange}
              />
            </div>
            <div className="days-btns-div">
              <button
                className={`day-btn ${
                  selectedTimeRange === "24h" ? "active" : ""
                }`}
                onClick={() => handleTimeRangeClick("24h")}
              >
                24H
              </button>
              <button
                className={`day-btn ${
                  selectedTimeRange === "7d" ? "active" : ""
                }`}
                onClick={() => handleTimeRangeClick("7d")}
              >
                7D
              </button>
              <button
                className={`day-btn ${
                  selectedTimeRange === "30d" ? "active" : ""
                }`}
                onClick={() => handleTimeRangeClick("30d")}
              >
                30D
              </button>
              <button
                className={`day-btn ${
                  selectedTimeRange === "365D" ? "active" : ""
                }`}
                onClick={() => handleTimeRangeClick("365D")}
              >
                1Y
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="content">
        <div className="about">
          <h3 className="about-head">About</h3>

          <div className="social">
            <div className="website">
              {coin.links?.homepage ? (
                <div>
                  <a href={coin.links.homepage[0]} target="blank">
                    {coin.name} Official Website
                  </a>
                  <FiExternalLink />
                </div>
              ) : null}
            </div>

            <div className="community">
              {coin.links?.facebook_username ? (
                <a
                  href={`https://www.facebook.com/${coin.links.facebook_username}`}
                  target="blank"
                >
                  <div className="community-social">
                    <span>Facebook</span>
                    <FaSquareFacebook />
                  </div>
                </a>
              ) : null}
              {coin.links?.twitter_screen_name ? (
                <a
                  href={`https://www.twitter.com/${coin.links.twitter_screen_name}`}
                  target="_blank"
                >
                  <div className="community-social">
                    <span>Twitter</span>
                    <FaTwitter />
                  </div>
                </a>
              ) : null}
            </div>
          </div>

          <p
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                coin.description ? coin.description.en : ""
              ),
            }}
          ></p>
        </div>
      </div>

      <div className="content">
        <div className="trending-coins-container">
          <h3 className="trending-coins-head color-text-heading">
            Trending{" "}
            <span className="trending-coins-heading-span color-text-span">
              Coins
            </span>
          </h3>
          <Carousel />
        </div>
      </div>
    </div>
  );
}

export default Coin;
