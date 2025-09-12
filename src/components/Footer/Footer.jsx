import "./Footer.css";
import { Link } from "react-router-dom";
import githubIcon from "../../assets/Images/github-icon.svg";
import facebookIcon from "../../assets/Images/facebook-icon.svg";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__text">© 2025 Supersite, Powered by News API</p>
      <div className="footer__links">
        <nav className="footer__nav">
          <ul className="footer__nav-list">
            <li>
              <a href="/news-explorer/" className="footer__link">
                Home
              </a>
            </li>
            <li>
              <a
                href="https://tripleten.com/"
                className="footer__link"
                target="_blank"
                rel="noreferrer"
              >
                TripleTen
              </a>
            </li>
          </ul>
        </nav>
        <div className="footer__socials">
          <a
            href="https://github.com/Sopuruoti641/news-explorer"
            aria-label="Visit GitHub repository"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src={githubIcon}
              alt="GitHub logo"
              className="footer__github-icon"
              target="_blank"
              rel="noreferrer"
            />
          </a>
          <a
            href="https://www.facebook.com/"
            aria-label="Visit Facebook"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src={facebookIcon}
              alt="Facebook logo"
              className="footer__facebook-icon"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
