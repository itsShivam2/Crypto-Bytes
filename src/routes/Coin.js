import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import DOMPurify from "dompurify";
import "./Coin.css";
import { FiExternalLink } from "react-icons/fi";
import { FaSquareFacebook, FaTwitter } from "react-icons/fa6";
import UpArrow from "../image/uparrow.png";
import DownArrow from "../image/downarrow.png";

function Coin() {
  const params = useParams();

  const [coin, setCoin] = useState({});

  const url = `https://api.coingecko.com/api/v3/coins/${params.coinId}`;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    axios
      .get(url)
      .then((res) => {
        setCoin(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [params.coinId]);

  const [trendingCoins, setTrendingCoins] = useState([]);
  const trendingUrl = "https://api.coingecko.com/api/v3/search/trending";
  useEffect(() => {
    axios
      .get(trendingUrl)
      .then((response) => {
        setTrendingCoins(response.data.coins);
        console.log(response.data.coins);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="coin-container">
      <div className="content">
        <div className="rank">
          <span className="rank-btn">Rank #{coin.market_cap_rank}</span>
        </div>

        <div className="info">
          <div className="coin-heading">
            <div className="icon-name-div">
              {coin.image ? <img src={coin.image.small} /> : null}
              <h2>{coin.name}</h2>
            </div>
            <div>
              <span>{coin.symbol}</span>
            </div>
          </div>

          <div className="coin-price">
            {coin.market_data?.current_price ? (
              <h2>₹{coin.market_data.current_price.inr}</h2>
            ) : null}
            {coin.market_data?.price_change_percentage_24h_in_currency ? (
              coin.market_data.price_change_percentage_24h_in_currency.inr <
              0 ? (
                <div className="red">
                  <img src={DownArrow} alt="img1" />
                </div>
              ) : (
                <div className="green">
                  <img src={UpArrow} alt="img2" />
                </div>
              )
            ) : null}
          </div>
        </div>
      </div>

      <div className="content">
        <div className="coin-price-update">
          <h3 className="coin-price-update-head">
            <strong>{coin.name}</strong> Price Update
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
        <div className="price-trends-table">
          <div>
            <h2>Price Changes </h2>
          </div>

          <div className="price-trends">
            <div className="price-trends-individual">
              <p>1h</p>
              <span>
                {coin.market_data?.price_change_percentage_1h_in_currency ? (
                  <p>
                    {coin.market_data.price_change_percentage_1h_in_currency.inr.toFixed(
                      2
                    )}
                    %
                  </p>
                ) : null}
              </span>
            </div>
            <div className="price-trends-individual">
              <p>1d</p>
              <span>
                {coin.market_data?.price_change_percentage_24h_in_currency ? (
                  <p>
                    {coin.market_data.price_change_percentage_24h_in_currency.inr.toFixed(
                      2
                    )}
                    %
                  </p>
                ) : null}
              </span>
            </div>
            <div className="price-trends-individual">
              <p>7d</p>
              <span>
                {coin.market_data?.price_change_percentage_7d_in_currency ? (
                  <p>
                    {coin.market_data.price_change_percentage_7d_in_currency.inr.toFixed(
                      2
                    )}
                    %
                  </p>
                ) : null}
              </span>
            </div>
            <div className="price-trends-individual">
              <p>14d</p>
              <span>
                {coin.market_data?.price_change_percentage_14d_in_currency ? (
                  <p>
                    {coin.market_data.price_change_percentage_14d_in_currency.inr.toFixed(
                      2
                    )}
                    %
                  </p>
                ) : null}
              </span>
            </div>
            <div className="price-trends-individual">
              <p>30d</p>
              <span>
                {coin.market_data?.price_change_percentage_30d_in_currency ? (
                  <p>
                    {coin.market_data.price_change_percentage_30d_in_currency.inr.toFixed(
                      2
                    )}
                    %
                  </p>
                ) : null}
              </span>
            </div>
            <div className="price-trends-individual">
              <p>1y</p>
              <span>
                {coin.market_data?.price_change_percentage_1y_in_currency ? (
                  <p>
                    {coin.market_data.price_change_percentage_1y_in_currency.inr.toFixed(
                      2
                    )}
                    %
                  </p>
                ) : null}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="content">
        <h2 className="statistics-head">Statistics</h2>

        <div className="stats">
          <div className="left">
            <div className="row">
              <h3>24 Hour Low</h3>
              {coin.market_data?.low_24h ? (
                <p>₹{coin.market_data.low_24h.inr}</p>
              ) : null}
            </div>
            <div className="row">
              <h3>24 Hour High</h3>
              {coin.market_data?.high_24h ? (
                <p>₹{coin.market_data.high_24h.inr}</p>
              ) : null}
            </div>
            <div className="row">
              <h3>Market Cap</h3>
              {coin.market_data?.market_cap ? (
                <p>₹{coin.market_data.market_cap.inr}</p>
              ) : null}
            </div>
          </div>

          <div className="right">
            <div className="row">
              <h3>Volume</h3>
              {coin.market_data?.total_volume ? (
                <p>₹{coin.market_data.total_volume.inr}</p>
              ) : null}
            </div>
            <div className="row">
              <h3>Circulating Supply</h3>
              {coin.market_data?.circulating_supply ? (
                <p>{coin.market_data.circulating_supply}</p>
              ) : null}
            </div>
            <div className="row">
              <h3>Total Supply</h3>
              {coin.market_data?.total_supply ? (
                <p>{coin.market_data.total_supply}</p>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <div className="content">
        <div className="about">
          <h3>About</h3>

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
        <div className="trending-coins">
          <h3 className="trending-coins-head">Trending Coins</h3>

          <div className="trending-coin">
            {trendingCoins.map((trendingCoin) => {
              return (
                <Link
                  to={`/coin/${trendingCoin.item.id}`}
                  element={<Coin />}
                  key={trendingCoin.item.id}
                >
                  {" "}
                  <div className="trending-coin-individual">
                    {trendingCoin.item?.small ? (
                      <img
                        className="trending-thumb"
                        src={trendingCoin.item.small}
                      />
                    ) : null}
                    <div>{trendingCoin.item.name}</div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Coin;
