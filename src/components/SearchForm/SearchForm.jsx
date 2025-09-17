import "./SearchForm.css";
import { useState } from "react";

function SearchForm({ onSearchResults }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setError("Please enter a keyword");
      return;
    }

    setError("");
    onSearchResults(searchQuery);
  };

  return (
    <form className="searchform" onSubmit={handleSubmit}>
      <section className="searchform__container">
        <input
          type="text"
          className="searchform__input"
          placeholder="Enter topic"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="searchform__btn">
          Search
        </button>
      </section>
      {error && <p className="searchform__error">{error}</p>}
    </form>
  );
}
export default SearchForm;
