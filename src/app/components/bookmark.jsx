import React from 'react';
import PropTypes from 'prop-types';

const Bookmark = ({ _id, bookmark, onHandleToggleBookmark }) => {
   return (
      <i
         className={`cu-pointer bi bi-heart${
            bookmark === false ? ' opacity-25' : '-fill text-danger'
         }`}
         onClick={() => onHandleToggleBookmark(_id)}
      />
   );
};

Bookmark.propTypes = {
   _id: PropTypes.string.isRequired,
   bookmark: PropTypes.bool.isRequired,
   onHandleToggleBookmark: PropTypes.func.isRequired
};

export default Bookmark;
