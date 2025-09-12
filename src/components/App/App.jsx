import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import { fetchNewsArticles } from "../../utils/NewsApi";
import { authorize, checkToken } from "../../utils/auth";
import SavedNews from "../SavedNews/SavedNews";
import SuccessModal from "../SuccessModal/SuccessModal";
import ProtectedRoute from "../ProtectedRoute";
import Navigation from "../Navigation/Navigation";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [articles, setArticles] = useState([]);
  const [savedArticles, setSavedArticles] = useState(() => {
    const stored = localStorage.getItem("savedArticles");
    return stored ? JSON.parse(stored) : [];
  });
  const [isLoading, setIsLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);
  const [noResults, setNoResults] = useState(false);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSignInClick = () => setActiveModal("login");
  const handleSignUpLinkClick = () => {
    closeActiveModal();
    setActiveModal("sign-up");
  };
  const handleLoginLinkClick = () => {
    closeActiveModal();
    setActiveModal("login");
  };
  const closeActiveModal = () => setActiveModal("");

  const handleRegistrationSubmit = async ({ email, password, name }) => {
    try {
      localStorage.setItem(
        "userData",
        JSON.stringify({ name, email, password })
      );
      const data = await authorize(email, password);
      if (data.token) {
        localStorage.setItem("jwt", data.token);
        const userData = await checkToken(data.token);
        if (userData.data) {
          closeActiveModal();
          setActiveModal("success");
        }
      }
    } catch (err) {
      console.error("Registration error:", err);
    }
  };

  const handleLoginSubmit = async ({ email, password }) => {
    try {
      const data = await authorize(email, password);
      if (data.token) {
        localStorage.setItem("jwt", data.token);
        const userData = await checkToken(data.token);
        if (userData.data) {
          setCurrentUser(userData.data);
          setIsLoggedIn(true);
          closeActiveModal();
        }
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("jwt");
  };

  const handleSearch = async (searchQuery) => {
    setIsLoading(true);
    setError(null);
    setNoResults(false);
    setArticles([]);
    try {
      const response = await fetchNewsArticles(searchQuery);
      if (!response.articles || response.articles.length === 0) {
        setNoResults(true);
      } else {
        setArticles(
          response.articles.map((article) => ({
            ...article,
            keyword: searchQuery,
          }))
        );
        setVisibleCount(3);
      }
    } catch (err) {
      console.error("Search error:", err);
      setError("Sorry, something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setSavedArticles(JSON.parse(localStorage.getItem("savedArticles")) || []);
  }, []);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      checkToken(jwt)
        .then((userData) => {
          if (userData.data) {
            setCurrentUser(userData.data);
            setIsLoggedIn(true);
          }
        })
        .catch(() => localStorage.removeItem("jwt"));
    }
  }, []);

  const handleSaveArticle = (article) => {
    const exists = savedArticles.find((a) => a.url === article.url);
    let updated;
    if (exists) {
      updated = savedArticles.filter((a) => a.url !== article.url);
    } else {
      updated = [...savedArticles, { ...article, id: Date.now() }];
    }
    setSavedArticles(updated);
    localStorage.setItem("savedArticles", JSON.stringify(updated));
  };

  // ✅ NavigationWrapper inside App so handleSearch is in scope
  const NavigationWrapper = ({
    isLoggedIn,
    currentUser,
    handleSignInClick,
    handleLogout,
    isModalOpen,
  }) => {
    const location = useLocation();
    const isSavedArticlesPage =
      location.pathname === "/saved-articles" ||
      location.pathname === "/news-explorer/saved-articles";

    return isSavedArticlesPage ? (
      <Navigation
        isLoggedIn={isLoggedIn}
        handleSignInClick={handleSignInClick}
        currentUser={currentUser}
        handleLogout={handleLogout}
        isModalOpen={isModalOpen}
      />
    ) : (
      <Header
        isLoggedIn={isLoggedIn}
        handleSignInClick={handleSignInClick}
        currentUser={currentUser}
        handleLogout={handleLogout}
        isModalOpen={isModalOpen}
        handleSearch={handleSearch} // ✅ now in scope
      />
    );
  };

  return (
    <BrowserRouter basename="/news-explorer">
      <div className="app">
        <NavigationWrapper
          isLoggedIn={isLoggedIn}
          currentUser={currentUser}
          handleSignInClick={handleSignInClick}
          handleLogout={handleLogout}
          isModalOpen={activeModal !== ""}
        />

        <Routes>
          <Route
            path="/"
            element={
              <Main
                articles={articles}
                savedArticles={savedArticles}
                isLoading={isLoading}
                noResults={noResults}
                error={error}
                visibleCount={visibleCount}
                setVisibleCount={setVisibleCount}
                isLoggedIn={isLoggedIn}
                handleSaveArticle={handleSaveArticle}
              />
            }
          />
          <Route
            path="/saved-articles"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <SavedNews
                  isLoggedIn={isLoggedIn}
                  handleLogout={handleLogout}
                  currentUser={currentUser}
                  savedArticles={savedArticles}
                  handleSaveArticle={handleSaveArticle}
                />
              </ProtectedRoute>
            }
          />
        </Routes>

        <Footer />

        <LoginModal
          isOpen={activeModal === "login"}
          onClose={closeActiveModal}
          handleSignUpLinkClick={handleSignUpLinkClick}
          handleLoginSubmit={handleLoginSubmit}
        />

        <RegisterModal
          isOpen={activeModal === "sign-up"}
          onClose={closeActiveModal}
          handleLoginLinkClick={handleLoginLinkClick}
          handleRegistrationSubmit={handleRegistrationSubmit}
        />

        <SuccessModal
          isOpen={activeModal === "success"}
          onClose={closeActiveModal}
          handleLoginLinkClick={handleLoginLinkClick}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
