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
  const location = useLocation();
  const currentPath = location.pathname;
  const isSavedArticlesPage =
    currentPath === "/saved-articles" ||
    currentPath === "/news-explorer/saved-articles";

  const handleSignInClick = () => {
    setActiveModal("login");
  };
  const handleSignUpLinkClick = () => {
    closeActiveModal();
    setActiveModal("sign-up");
  };

  const handleLoginLinkClick = () => {
    closeActiveModal();
    setActiveModal("login");
  };

  const handleRegistrationSubmit = async ({ email, password, name }) => {
    try {
      console.log("Starting registration with:", { email, name });
      const userData = { name, email, password };
      console.log("About to store userData:", userData);
      localStorage.setItem("userData", JSON.stringify(userData));
      console.log(
        "Checking localStorage after setting:",
        localStorage.getItem("userData")
      );

      const data = await authorize(email, password);
      console.log("Authorize response:", data);
      if (data.token) {
        localStorage.setItem("jwt", data.token);
        const userData = await checkToken(data.token);
        console.log("CheckToken response:", userData);
        if (userData.data) {
          closeActiveModal();
          setActiveModal("success");
        }
      }
    } catch (error) {
      console.error("Registration error:", error);
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
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("jwt");
  };

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
        .catch((err) => {
          console.error(err);
          localStorage.removeItem("jwt");
        });
    }
  }, []);

  const closeActiveModal = () => {
    setActiveModal("");
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
        const articlesWithKeyword = response.articles.map((article) => ({
          ...article,
          keyword: searchQuery,
        }));
        setArticles(articlesWithKeyword);
        setVisibleCount(3);
      }
    } catch (err) {
      console.error("Search error:", err);
      setError(
        "Sorry, something went wrong during the request. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isSavedArticlesPage) {
      setArticles([]);
      setNoResults(false);
      setError(null);
      setVisibleCount(3);
    }
  }, [isSavedArticlesPage]);

  const handleSaveArticle = (article) => {
    const existing = savedArticles.find((a) => a.url === article.url);

    if (existing) {
      const updated = savedArticles.filter((a) => a.url !== article.url);
      setSavedArticles(updated);
    } else {
      const newArticle = {
        ...article,
        id: Date.now(),
      };
      setSavedArticles([...savedArticles, newArticle]);
    }
  };

  useEffect(() => {
    localStorage.setItem("savedArticles", JSON.stringify(savedArticles));
  }, [savedArticles]);

  return (
    <div className="app">
      {isSavedArticlesPage ? (
        <Navigation
          isLoggedIn={isLoggedIn}
          handleSignInClick={handleSignInClick}
          currentUser={currentUser}
          handleLogout={handleLogout}
          isModalOpen={activeModal !== ""}
        />
      ) : (
        <Header
          handleSignInClick={handleSignInClick}
          currentUser={currentUser}
          handleLogout={handleLogout}
          onSearchResults={handleSearch}
          isLoggedIn={isLoggedIn}
          isModalOpen={activeModal !== ""}
        />
      )}
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
  );
}

export default App;
