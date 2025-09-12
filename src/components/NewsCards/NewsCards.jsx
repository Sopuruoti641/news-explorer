import React from "react";
import "./NewsCards.css";
import NewsCard from "../NewsCard/NewsCard";

function NewsCards({
  articles,
  visibleCount,
  setVisibleCount,
  isLoggedIn,
  handleSaveArticle,
  savedArticles,
}) {
  const showMore = () => {
    // Only increase visibleCount up to the total number of articles
    setVisibleCount((prevCount) => Math.min(prevCount + 3, articles.length));
  };

  const visibleArticles = articles.slice(0, visibleCount);

  return (
    <section className="news-cards">
      <h2 className="news-cards__title">Search results</h2>
      <ul className="news-cards__list">
        {visibleArticles.map((article) => (
          <li className="news-cards__card" key={article.url}>
            <NewsCard
              isLoggedIn={isLoggedIn}
              image={article.urlToImage}
              date={article.publishedAt}
              title={article.title}
              description={article.description}
              source={article.source.name}
              url={article.url}
              keyword={article.keyword}
              handleSaveArticle={handleSaveArticle}
              savedArticles={savedArticles}
            />
          </li>
        ))}
      </ul>
      {visibleCount < articles.length && (
        <button className="news-cards__show-more-btn" onClick={showMore}>
          Show More
        </button>
      )}
    </section>
  );
}

export default NewsCards;
