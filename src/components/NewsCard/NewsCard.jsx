import "./NewsCard.css";
import { formatDate } from "../../utils/helpers.js";
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
  savedArticles,
  keyword,
  url,
}) {
  const location = useLocation();
  const isSavedArticlesPage = location.pathname.includes("saved-articles");
  const formattedDate = formatDate(date);

  // Check if this article is saved based on savedArticles prop
  const normalizeUrl = (url) => url?.trim().toLowerCase();

  const isSaved = savedArticles?.some(
    (savedArticle) => normalizeUrl(savedArticle.url) === normalizeUrl(url)
  );

  const handleSaveClick = (e) => {
    e.stopPropagation();
    e.currentTarget.blur(); // Fixes mobile focus bug

    if (!isLoggedIn) return; // ✅ Only block if not logged in

    const articleToSave = {
      title,
      description,
      url,
      urlToImage: image || placeholderImage,
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
    <article
      className="newsCard"
      tabIndex="-1"
      onClick={(e) => {
        // Prevent open if clicking a button inside the card
        if (e.target.closest("button")) return;
        window.open(url, "_blank");
      }}
    >
      <img
        src={image || placeholderImage}
        alt={title}
        className="newsCard__image"
      />
      {isSavedArticlesPage && keyword && (
        <div className="newsCard__keyword">
          {keyword.charAt(0).toUpperCase() + keyword.slice(1)}
        </div>
      )}
      <button
        type="button"
        className={buttonClassName}
        onClick={handleSaveClick}
        aria-label={
          isSavedArticlesPage
            ? "Remove from saved"
            : isSaved
            ? "Unsave article"
            : "Save article"
        }
      >
        {!isLoggedIn && !isSavedArticlesPage && (
          <span className="newsCard__tooltip">Sign in to save articles</span>
        )}
        {isSavedArticlesPage && (
          <span className="newsCard__tooltip">Remove from saved</span>
        )}
      </button>
      <section className="newsCard__content">
        <p className="newsCard__date">{formattedDate}</p>
        <h2 className="newsCard__title">{title}</h2>
        <p className="newsCard__description">{description}</p>
        <p className="newsCard__source">{source}</p>
      </section>
    </article>
  );
}

export default NewsCard;
