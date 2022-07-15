import React from 'react';

const Quality = ({ _id, color, name }) => {
   return (
      <span key={_id} className={`badge m-1 bg-${color}`}>
         {name}
      </span>
   );
};

export default Quality;
