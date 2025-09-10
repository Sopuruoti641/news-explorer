import "./Navigation.css";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import MobileMenuModal from "../MobileMenuModal/MobileMenuModal";

function Navigation({
  handleSignInClick,
  isLoggedIn,
  handleLogout,
  currentUser,
  isModalOpen,
}) {
  const location = useLocation();
  const currentPath = location.pathname;
  const isSavedArticlesPage =
    currentPath === "/saved-articles" ||
    currentPath === "/news-explorer/saved-articles";

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="navigation">
      <div
        className={`navigation__link-container ${
          isMobileMenuOpen ? "navigation__link-container_menu-opened" : ""
        }`}
      >
        <Link
          to="/"
          className={`navigation__logo ${
            isSavedArticlesPage ? "navigation__logo-saved" : ""
          }`}
        >
          NewsExplorer
        </Link>
        <button
          className={`navigation__menu-button ${
            isMobileMenuOpen ? "navigation__menu-close-btn" : ""
          } ${isSavedArticlesPage ? "navigation__menu-button-saved" : ""} ${
            isModalOpen ? "navigation__menu-button-hidden" : ""
          }`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        ></button>

        <div className="navigation__links">
          <NavLink
            to="/"
            className={(isActive) =>
              `navigation__home-link ${
                isActive ? "navigation__link_active" : ""
              } ${isSavedArticlesPage ? "navigation__home-link-saved" : ""}`
            }
          >
            {({ isActive }) => (
              <div
                className={`navigation__link-wrapper ${
                  isActive ? "navigation__link-wrapper_active" : ""
                }`}
              >
                Home
              </div>
            )}
          </NavLink>
          {isLoggedIn ? (
            <>
              <NavLink
                to="/saved-articles"
                className={(isActive) =>
                  `navigation__saved-link ${
                    isActive ? "navigation__link_active" : ""
                  } ${
                    isSavedArticlesPage ? "navigation__saved-link-saved" : ""
                  }`
                }
              >
                {({ isActive }) => (
                  <div
                    className={`navigation__link-wrapper ${
                      isActive ? "navigation__link-wrapper_saved" : ""
                    }`}
                  >
                    Saved articles
                  </div>
                )}
              </NavLink>

              <button
                className={`navigation__sign-out-btn ${
                  isSavedArticlesPage ? "navigation__sign-out-btn-saved" : ""
                }`}
                onClick={handleLogout}
              >
                {currentUser?.name}
                <span
                  className={`navigation__logout-icon ${
                    isSavedArticlesPage ? "navigation__logout-icon-saved" : ""
                  }`}
                ></span>
              </button>
            </>
          ) : (
            <button
              className="navigation__sign-in-btn"
              onClick={handleSignInClick}
            >
              Sign in
            </button>
          )}
        </div>
      </div>

      <MobileMenuModal
        isOpen={isMobileMenuOpen}
        isLoggedIn={isLoggedIn}
        handleSignInClick={handleSignInClick}
        handleLogout={handleLogout}
        currentUser={currentUser}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </nav>
  );
}

export default Navigation;
