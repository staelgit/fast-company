import React from 'react';
import PropTypes from 'prop-types';

const Bookmark = ({ _id, bookmark, onHandleToggleBookmark }) => {
   return (
      <i
         className={`favorites-button bi bi-heart${
            bookmark === false ? '' : '-fill'
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
