// project import
import React from 'react';
import MainCard from 'components/MainCard';
import FireMap from 'components/firemap/index';
import 'leaflet/dist/leaflet.css'

const SamplePage = () => {
  return (
    <MainCard>
      <FireMap />
    </MainCard>
  );
};

export default SamplePage;
