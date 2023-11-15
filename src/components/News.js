import React, {useRef} from "react";
import "./News.css";
import "./Home.css";
import { useState } from "react";

function News(props) {
  //For Pagination starts
  const [currentPage, setCurrentPage] = useState(1);
  const [newsPerPage, setNewsperPage] = useState(5);
  const indexOfLastPage = currentPage * newsPerPage;
  const indexOfFirstPage = indexOfLastPage - newsPerPage;
  const currentNews = props.news.slice(indexOfFirstPage, indexOfLastPage);

  function paginate(pageNumber) {
    setCurrentPage(pageNumber);
  }
  console.log(currentNews);

  const pages = [];
  for (let i = 1; i <= Math.ceil(props.news.length / props.newsPerPage); i++) {
    pages.push(i);
  }
  console.log(currentPage);

  const newsHeadingRef = useRef(null);

  //For Pagination ends

  return (
    <div className="news-cards-page">
       <h2 ref={newsHeadingRef} className="section-heading">Trending <span className="section-heading-span">News</span></h2> 
      <div className="news-cards">
        {currentNews.map((article) => {
          return (
            <div className="news-card">
              <div className="news-image-source">
                <img className="news-image" src={article.image} />
                <div className="source">{article.source.name}</div>
              </div>
              <div className="news-content">
                <div>
                  <h2>{article.title}</h2>
                </div>
                <div className="author-date">
                  {/* <p className="author">Written by : {article.author}</p> */}
                  <p className="date">Date : {article.publishedAt}</p>
                </div>
                <div className="news-description">{article.description}</div>
                <button className="glow-on-hover">
                  <a href={article.url} target="_blank">
                    Read More
                  </a>
                </button>
              </div>
            </div>
          );
        })}{" "}
      </div>
      <div class="pagination-container">
        <>
          {currentPage === 1 ? (
            <a
              className="prev-button"
              onClick={() => {
                paginate(Math.ceil(props.news.length / newsPerPage));
                window.scrollTo({ top: newsHeadingRef.current.offsetTop, behavior: "smooth" });
              }}
            >
              Prev
            </a>
          ) : (
            <a
              className="prev-button"
              onClick={() => {
                paginate(currentPage - 1);
                window.scrollTo({ top: newsHeadingRef.current.offsetTop, behavior: "smooth" });
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
          {currentPage === Math.ceil(props.news.length / newsPerPage) ? (
            <a
              className="next-button"
              onClick={() => {
                paginate(1);
                window.scrollTo({ top: newsHeadingRef.current.offsetTop, behavior: "smooth" });
              }}
            >
              Next
            </a>
          ) : (
            <a
              className="next-button"
              onClick={() => {
                paginate(currentPage + 1);
                window.scrollTo({ top: newsHeadingRef.current.offsetTop, behavior: "smooth" });
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

export default News;
