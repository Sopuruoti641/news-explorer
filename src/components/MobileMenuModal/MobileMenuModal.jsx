import "./MobileMenuModal.css";
import { NavLink } from "react-router-dom";

function MobileMenuModal({
  isOpen,
  handleSignInClick,
  onClose,
  isLoggedIn,
  handleLogout,
  currentUser,
}) {
  return (
    <div
      className={`mobileMenuModal ${isOpen ? "mobileMenuModal_opened" : ""}`}
    >
      <NavLink
        to="/"
        className={`mobileMenuModal__home-link ${
          isLoggedIn ? "mobileMenuModal__home-link-logged-in" : ""
        }`}
        onClick={onClose}
      >
        Home
      </NavLink>

      {isLoggedIn ? (
        <>
          <NavLink
            to="/saved-articles"
            className="mobileMenuModal__saved-link"
            onClick={onClose}
          >
            Saved articles
          </NavLink>
          <button
            className="mobileMenuModal__sign-out-btn"
            onClick={() => {
              handleLogout();
              onClose();
            }}
          >
            LogOut
          </button>
        </>
      ) : (
        <button
          className="mobileMenuModal__sign-in-btn"
          onClick={() => {
            handleSignInClick();
            onClose();
          }}
        >
          Sign in
        </button>
      )}
    </div>
  );
}

export default MobileMenuModal;
