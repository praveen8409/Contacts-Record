// SearchBar.js
import React, { useState } from "react";
import toast from "react-hot-toast";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    if(query !== ''){
        onSearch(query);
    }else{
      toast.error('Field not should be empty');
    }
    setQuery("");
    
  };

  return (
    <div className="mb-4 ">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleInputChange}
        className="py-2 px-4 border rounded-md"
      />
      <button onClick={handleSearch} className="py-2 px-4 bg-blue-500 text-white rounded-md ml-2">
        Search
      </button>
    </div>
  );
};

export default SearchBar;
