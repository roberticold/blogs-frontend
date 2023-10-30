import React, { useEffect } from "react";

const Filter = ({ handleFiltered, filterNames }) => {
  useEffect(() => {
    handleFiltered("All");
  }, []);
  return (
    <>
      <h4 className="filterByAuthors">Filter By Authors</h4>
      <div className="filterDropdownContainer">
        <select
          className="filterDropdown"
          onChange={(e) => handleFiltered(e.target.value)}
          name=""
          id=""
          
        >
          <option value="All">All</option>
          {filterNames.map((e) => (
            <option key={e} value={e}>
              {e}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default Filter;
