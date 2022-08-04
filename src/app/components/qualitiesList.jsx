import React from 'react';
import PropTypes from 'prop-types';
import Quality from './quality';

const QualitiesList = ({ qualities }) => {
   return (
      <>
         {qualities.map((quality) => (
            <Quality key={quality._id} {...quality} />
         ))}
      </>
   );
};

QualitiesList.propTypes = {
   qualities: PropTypes.arrayOf(
      PropTypes.shape({
         _id: PropTypes.string,
         color: PropTypes.string,
         name: PropTypes.string
      })
   ).isRequired
};

export default QualitiesList;
