import React from "react";
import Coin from "../routes/Coin";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./CoinCard.css";

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
   console.log(currentCoins);
  
  const pages = [];
  for (
    let i = 1;
    i <= Math.ceil(props.coins.length / props.coinsPerPage);
    i++
  ) {
    pages.push(i);
  }
  console.log(currentPage);

  //For Pagination ends

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

  // Search ends
  
  

  //Could have written like this in the input field itself
  // onChange={(event) => {
  //   setSearchWord(event.target.value);
  // }}

  return (
    <div className="market-data">
      <div className="heading-search">
        <div className="section-heading">Market Trends</div>

        <input
          className="search-box"
          placeholder="Search coins..."
          onChange={searchChangeHandler}
        />
      </div>

      <div className="coin-table">
        <div className="thead">
          <div className="rank-head">#</div>
          <div className="coin-head">Coin</div>
          <div className="price-head">24h</div>
          <div className="h24-head">Price</div>
          {/* <div className="market-cap-head">Market Cap</div> */}
        </div>
        {/*   */}
        <div className="tbody">
          {filteredCoins.map((coin) => {
            return (
              <div className="coin-row">
                <div className="rank-data-left">
                  <span>{coin.market_cap_rank}</span>
                </div>

                <div className="icon-symbol">
                  <Link
                    to={`/coin/${coin.id}`}
                    element={<Coin />}
                    key={coin.id}
                  >
                    <div className="icon-symbol-div">
                      <img className="coin-icon" src={coin.image} />
                      <span className="symbol">
                        {coin.symbol.toUpperCase()}
                      </span>
                    </div>
                  </Link>
                </div>
                <div className="h24-data-right">
                  {coin.price_change_percentage_24h < 0 ? (
                    <span className="red">
                      {coin.price_change_percentage_24h.toFixed(2)}%
                    </span>
                  ) : (
                    <span className="green">
                      {coin.price_change_percentage_24h.toFixed(2)}%
                    </span>
                  )}
                  {/* <span>{coin.price_change_percentage_24h.toFixed(2)}%</span> */}
                </div>
                <div className="price-data-right">
                  <span>₹{coin.current_price.toLocaleString("en-IN")}</span>
                </div>
                {/* <div className="market-cap-data-right">
                  <span>₹{coin.market_cap.toLocaleString("en-IN")}</span>
                </div> */}
              </div>
            );
          })}
        </div>
      </div>

      <div class="pagination-container">
        <>
          {currentPage === 1 ? (
            <a
              className="prev-button"
              onClick={() =>
                paginate(Math.ceil(props.coins.length / coinsPerPage))
              }
            >
              Prev
            </a>
          ) : (
            <a
              className="prev-button"
              onClick={() => paginate(currentPage - 1)}
            >
              Prev
            </a>
          )}
        </>

        <div className="current-page">
          <span>{currentPage}</span>
        </div>

        <>
          {currentPage ===
          Math.ceil(props.coins.length / coinsPerPage) ? (
            <a className="next-button" onClick={() => paginate(1)}>
              Next
            </a>
          ) : (
            <a
              className="next-button"
              onClick={() => paginate(currentPage + 1)}
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
