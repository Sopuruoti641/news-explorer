import React from "react";
import "./Main.css";

import Preloader from "../Preloader/Predloader";
import NotFound from "../NotFound/NotFound";
import About from "../About/About";
import NewsCardList from "../NewsCards/NewsCards";

function Main({
  articles,
  isLoading,
  noResults,
  error,
  visibleCount,
  setVisibleCount,
  isLoggedIn,
  handleSaveArticle,
  savedArticles,
}) {
  return (
    <main className="main">
      {isLoading && <Preloader text="Searching for news..." />}

      {error && !isLoading && <p className="main__error">{error}</p>}

      {!isLoading &&
        !error &&
        !noResults &&
        articles &&
        articles.length > 0 && (
          <section className="main__news-conatiner">
            <NewsCardList
              articles={articles}
              visibleCount={visibleCount}
              setVisibleCount={setVisibleCount}
              isLoggedIn={isLoggedIn}
              handleSaveArticle={handleSaveArticle}
              savedArticles={savedArticles}
            />
          </section>
        )}
      {noResults && <NotFound />}
      <section className="main__about">
        <About />
      </section>
    </main>
  );
}

export default Main;
