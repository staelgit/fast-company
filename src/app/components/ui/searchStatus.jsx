import React from 'react';
import declOfNum from '../../lib/decl_Of_Num';
import PropTypes from 'prop-types';

const SearchStatus = ({ length }) => {
   const classes = `badge ${length === 0 ? 'bg-danger' : 'bg-primary'}`;

   const text =
      length === 0
         ? 'Никто с тобой не тусанет'
         : `${length} ${declOfNum(length, [
              'человек тусанет',
              'человека тусанут',
              'человек тусанет'
           ])} с тобой сегодня`;

   return (
      <h2>
         <span className={classes}>{text}</span>
      </h2>
   );
};

SearchStatus.propTypes = {
   length: PropTypes.number.isRequired
};

export default SearchStatus;
