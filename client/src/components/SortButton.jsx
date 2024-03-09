// SortButton.js
import React from "react";

const SortButton = ({ field, onSort }) => {
  const handleSort = () => {
    onSort(field);
  };

  return (
    <button onClick={handleSort} className="py-2 px-4 mr-2 btn btn-outline btn-info">
      Sort by {field}
    </button>
  );
};

export default SortButton;
