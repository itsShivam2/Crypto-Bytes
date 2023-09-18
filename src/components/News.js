import React from "react";
import "./News.css";
import { Link } from "react-router-dom";
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

  //For Pagination ends

  return (
    <div className="news-cards-page">
      <div className="news-cards">
        {currentNews.map((article) => {
          return (
            <div className="news-card">
              <div className="news-image-source">
                <img className="news-image" src={article.urlToImage} />
                <div className="source">{article.source.name}</div>
              </div>
              <div className="news-content">
                <div>
                  <h2>{article.title}</h2>
                </div>
                <div className="author-date">
                  <p className="author">Written by : {article.author}</p>
                  <p className="date">Date : {article.publishedAt}</p>
                </div>
                <div className="news-description">{article.description}</div>
                {/* <Link to={props.article.url}>Read More</Link> */}

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
              onClick={() =>
                paginate(Math.ceil(props.news.length / newsPerPage))
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
          Math.ceil(props.news.length / newsPerPage) ? (
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

  // return props.news.map((article) => {
  //   return (
  //     <div className="news-cards">
  //       <div className="news-image-source">
  //         <img className="news-image" src={article.urlToImage} />
  //         <div className="source">{article.source.name}</div>
  //       </div>
  //       <div className="news-content">
  //         <div>
  //           <h2>{article.title}</h2>
  //         </div>
  //         <div className="author-date">
  //           <p className="author">Written by : {article.author}</p>
  //           <p className="date">Date : {article.publishedAt}</p>
  //         </div>
  //         <div className="news-description">{article.description}</div>
  //         {/* <Link to={props.article.url}>Read More</Link> */}

  //         <button className="glow-on-hover">
  //           <a href={article.url} target="_blank">
  //             Read More
  //           </a>
  //         </button>
  //       </div>
  //     </div>
  //   );
  // });
}

export default News;
