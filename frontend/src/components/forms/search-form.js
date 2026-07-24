'use client';
import React, { useState } from "react";
import Search from "@svg/search";
import { useRouter } from "next/navigation";

const SearchForm = ({ mobile = false }) => {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = searchText.trim();
    if (query) {
      router.push(`/search?query=${encodeURIComponent(query)}`);
      setSearchText("");
    } else {
      router.push("/shop");
    }
  };

  return (
    <form onSubmit={handleSubmit} role="search">
      <div
        className={`header__search-input-13 ${
          mobile ? "eminence-search-mobile" : "d-none d-xl-block"
        }`}
      >
        <input
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
          type="search"
          placeholder="Search for products..."
          aria-label="Search products"
        />
        <button type="submit" aria-label="Submit search">
          <Search />
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
