import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import s from "./SearchBar.module.css";

const SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState("");

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedQuery = query.trim();

    if (trimmedQuery === "") {
      toast.error("Please enter search query.");
      return;
    }

    onSubmit(trimmedQuery);
    setQuery("");
  };
  return (
    <div>
      <Toaster position="top-right" />
      <header className={s.header}>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={query}
            onChange={handleChange}
          />
          <button type="submit">Search</button>
        </form>
      </header>
    </div>
  );
};

export default SearchBar;
