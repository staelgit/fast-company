import React from 'react';
import PropTypes from 'prop-types';
import { useQualities } from '../../../hooks/useQualities';
import Loader from '../../common/loader';
import QualitiesList from './index';

const Qualities = ({ selectedQualitiesId }) => {
   const { isLoading, getQuality } = useQualities();
   const qualities = selectedQualitiesId.map((id) => getQuality(id));

   if (!isLoading) {
      return <QualitiesList qualities={qualities} />;
   } else return <Loader />;
};

Qualities.propTypes = {
   selectedQualitiesId: PropTypes.array
};

export default Qualities;
