import React from 'react';
import PropTypes from 'prop-types';
import { useQualities } from '../../../hooks/useQualities';

const Quality = ({ id }) => {
   const { getQuality } = useQualities();
   const { _id, name, color } = getQuality(id);

   return (
      <span key={_id} className={`badge m-1 bg-${color}`}>
         {name}
      </span>
   );
};

Quality.propTypes = {
   id: PropTypes.string.isRequired
};

export default Quality;
