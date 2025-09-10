import "./NotFound.css";
import NotFoundIcon from "../../assets/Images/not-found.png";

function NotFound() {
  return (
    <div className="notFound">
      <img src={NotFoundIcon} alt="Nothing Found" className="notFound__icon" />
      <h2 className="notFound__title">Nothing found</h2>
      <p className="notFound__text">
        Sorry, but nothing matched <br /> your search terms.
      </p>
    </div>
  );
}

export default NotFound;
