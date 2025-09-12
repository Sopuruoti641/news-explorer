import "./Header.css";
import SearchForm from "../SearchForm/SearchForm";
import Navigation from "../Navigation/Navigation";

function Header({
  handleSignInClick,
  isLoggedIn,
  handleLogout,
  currentUser,
  onSearchResults,
  isModalOpen,
}) {
  return (
    <header className="header">
      <Navigation
        handleSignInClick={handleSignInClick}
        isLoggedIn={isLoggedIn}
        handleLogout={handleLogout}
        currentUser={currentUser}
        isModalOpen={isModalOpen}
      />
      <section className="header__text-container">
        <h1 className="header__title">What's going on in the world?</h1>
        <h2 className="header__subtitle">
          Find the latest news on any topic and save them in your personal
          account.
        </h2>
      </section>
      <SearchForm onSearchResults={onSearchResults} />
    </header>
  );
}

export default Header;
