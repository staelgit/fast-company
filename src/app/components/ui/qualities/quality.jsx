import React from 'react';
import PropTypes from 'prop-types';

const Quality = ({ _id, name, color }) => {
   return (
      <span key={_id} className={`badge m-1 bg-${color}`}>
         {name}
      </span>
   );
};

Quality.propTypes = {
   _id: PropTypes.string.isRequired,
   name: PropTypes.string,
   color: PropTypes.string
};

export default Quality;
