import React from "react";
import Coin from "../../Pages/Coin";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./CoinCard.css";
import Carousel from "../Carousel/Carousel";

function CoinCard(props) {
  //For Pagination starts
  const [currentPage, setCurrentPage] = useState(1);
  const [coinsPerPage, setCoinsperPage] = useState(15);
  const indexOfLastPage = currentPage * coinsPerPage;
  const indexOfFirstPage = indexOfLastPage - coinsPerPage;
  const currentCoins = props.coins.slice(indexOfFirstPage, indexOfLastPage);

  function paginate(pageNumber) {
    setCurrentPage(pageNumber);
  }
  // console.log(currentCoins);

  const pages = [];
  for (
    let i = 1;
    i <= Math.ceil(props.coins.length / props.coinsPerPage);
    i++
  ) {
    pages.push(i);
  }
  // console.log(currentPage);

  //Pagination ends

  // Search starts
  const [searchWord, setSearchWord] = useState("");
  const filteredCoins = searchWord
    ? props.coins.filter((coin) =>
        coin.name.toLowerCase().includes(searchWord.toLowerCase())
      )
    : currentCoins;

  function searchChangeHandler(event) {
    setSearchWord(event.target.value);
  }

  const navigate = useNavigate();

  return (
    <div className="market-data">
      <Carousel />
      <div className="heading-search">
        <h2 className="section-heading">Market <span className="section-heading-span">Trends</span></h2>

        <input
          className="search-box"
          placeholder="Search coins..."
          onChange={searchChangeHandler}
        />
      </div>

      <table className="coin-table">
        <thead className="table-head">
          <tr className="table-head-row">
            <td className="rank-head">#</td>
            <td className="coin-head">Coin</td>
            <td className="price-head">24h</td>
            <td className="h24-head">Price</td>
            <td className="market-cap-head">Market Cap</td>
          </tr>
        </thead>
        <tbody>
          {filteredCoins.map((coin) => {
            return (
              <tr
                key={coin.id}
                onClick={() => navigate(`/coin/${coin.id}`)}
                className="coin-info"
              >
                <td className="rank-data-left">{coin.market_cap_rank}</td>

                <Link to={`/coin/${coin.id}`}>
                  <td className="icon-symbol">
                    {/* <div className="icon-symbol-div"> */}
                    <img className="coin-icon" src={coin.image} alt={coin.id} />
                    <div className="symbol-name-div">
                      <span className="symbol">
                        {coin.symbol.toUpperCase()}
                      </span>
                      <span className="name">{coin.name}</span>
                      {/* </div> */}
                    </div>
                  </td>
                </Link>

                <td className="h24-data-right">
                  {coin.price_change_percentage_24h < 0 ? (
                    <span className="red">
                      {coin.price_change_percentage_24h.toFixed(2)}%
                    </span>
                  ) : (
                    <span className="green">
                      {coin.price_change_percentage_24h.toFixed(2)}%
                    </span>
                  )}
                </td>
                <td className="price-data-right">
                  ₹{coin.current_price.toLocaleString("en-IN")}
                </td>
                <td className="market-cap-data-right">
                  ₹ {coin.market_cap.toString().slice(0, -6)}M
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="pagination-container">
        <>
          {currentPage === 1 ? (
            <a
              className="prev-button"
              onClick={() => {
                paginate(Math.ceil(props.coins.length / coinsPerPage));
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Prev
            </a>
          ) : (
            <a
              className="prev-button"
              onClick={() => {
                paginate(currentPage - 1);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Prev
            </a>
          )}
        </>

        <div className="current-page">
          <span>{currentPage}</span>
        </div>

        <>
          {currentPage === Math.ceil(props.coins.length / coinsPerPage) ? (
            <a
              className="next-button"
              onClick={() => {
                paginate(1);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Next
            </a>
          ) : (
            <a
              className="next-button"
              onClick={() => {
                paginate(currentPage + 1);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Next
            </a>
          )}
        </>
      </div>
    </div>
  );
}

export default CoinCard;
