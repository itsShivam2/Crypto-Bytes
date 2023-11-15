import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Coin from "./routes/Coin";
import News from "./components/News";
import Footer from "./components/Footer";

function App() {

  //Coin section starts
  
  const [coins, setCoins] = useState([]);
  const url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=150&page=1&sparkline=false&locale=en";

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setCoins(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //Coin section ends

  //News Section starts

  const [news, setNews] = useState([]);
  const newsURL =
  "https://gnews.io/api/v4/search?q=cryptocurrency&apikey=177793fbcc53903724f9af62af266ed6";

  useEffect(() => {
    axios
      .get(newsURL)
      .then((response) => {
        setNews(response.data.articles);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // News Section ends

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home coins={coins} news={news} />} />
        <Route path="/coin" element={<Coin />}>
          <Route path=":coinId" element={<Coin />} />
        </Route>
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
