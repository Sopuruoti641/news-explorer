import "./NewsCard.css";
import { formatDate } from "../../utils/helpers";
import { useLocation } from "react-router-dom";
import placeholderImage from "../../assets/Images/placeholder.jpg";

function NewsCard({
  isLoggedIn,
  image,
  date,
  title,
  description,
  source,
  handleSaveArticle,
  keyword,
  url,
  savedArticles, // ✅ get full list
}) {
  const location = useLocation();
  const isSavedArticlesPage = location.pathname.includes("saved-articles");
  const formattedDate = formatDate(date);

  // ✅ Calculate isSaved using current savedArticles
  const isSaved = savedArticles?.some(
    (savedArticle) => savedArticle.url === url
  );

  const handleSaveClick = (e) => {
    e.stopPropagation();
    if (!isLoggedIn) return;

    const articleToSave = {
      title,
      description,
      url,
      urlToImage: image,
      publishedAt: date,
      source: { name: source },
      keyword,
    };

    handleSaveArticle(articleToSave);
  };

  const buttonClassName = isSavedArticlesPage
    ? "newsCard__delete-btn"
    : `newsCard__save-btn ${isSaved ? "newsCard__save-btn-saved" : ""}`;

  return (
    <article className="newsCard">
      <div className="newsCard__button-wrapper">
        <button
          type="button"
          className={buttonClassName}
          onClick={handleSaveClick}
        >
          {!isLoggedIn && !isSavedArticlesPage && (
            <span className="newsCard__tooltip">Sign in to save articles</span>
          )}
          {isSavedArticlesPage && (
            <span className="newsCard__tooltip">Remove from saved</span>
          )}
        </button>
        {isSavedArticlesPage && keyword && (
          <div className="newsCard__keyword">
            {keyword.charAt(0).toUpperCase() + keyword.slice(1)}
          </div>
        )}
      </div>

      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="newsCard__link-wrapper"
      >
        <img
          src={image || placeholderImage}
          alt={title || "Placeholder image"}
          className="newsCard__image"
        />
        <section className="newsCard__content">
          <p className="newsCard__date">{formattedDate}</p>
          <h2 className="newsCard__title">{title}</h2>
          <p className="newsCard__description">{description}</p>
          <p className="newsCard__source">{source}</p>
        </section>
      </a>
    </article>
  );
}

export default NewsCard;
