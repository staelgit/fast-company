import React from 'react';

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

export default Bookmark;
