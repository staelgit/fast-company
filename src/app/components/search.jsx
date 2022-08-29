import React from 'react';
import PropTypes from 'prop-types';

const Search = ({ onSearchBy, value }) => {
   return (
      <div className="input-group mt-2">
         <span
            className="input-group-text bi bi-search bg-white"
            id="basic-addon1"
         ></span>
         <input
            type="text"
            className="form-control"
            placeholder="Введите имя для поиска"
            aria-label="Search"
            aria-describedby="basic-addon1"
            onChange={({ target }) => onSearchBy(String(target.value))}
            value={value}
         />
      </div>
   );
};

Search.propTypes = {
   onSearchBy: PropTypes.func.isRequired,
   value: PropTypes.string
};

export default Search;
