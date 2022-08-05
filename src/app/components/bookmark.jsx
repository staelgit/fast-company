import React from 'react';
import PropTypes from 'prop-types';

const Bookmark = ({ _id, bookmark, onToggleBookmark }) => {
   return (
      <i
         className={`favorites-button bi bi-heart${
            bookmark === false ? '' : '-fill'
         }`}
         onClick={() => onToggleBookmark(_id)}
      />
   );
};

Bookmark.propTypes = {
   _id: PropTypes.string.isRequired,
   bookmark: PropTypes.bool.isRequired,
   onToggleBookmark: PropTypes.func.isRequired
};

export default Bookmark;
