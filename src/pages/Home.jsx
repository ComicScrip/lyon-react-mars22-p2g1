import React from 'react';
import PopupDisplayHome from '../components/PopupDisplayHome';
import HomeBookSelection from '../components/HomeBookSelection';
import HomeBoxList from '../components/HomeBoxList';
import Mapsection from '../components/Mapmodule';
import PopupDisplayBal from '../components/PopupDisplayBal';

export default function Home() {
  return (
    <>
      <div className="mapContainer">
        <Mapsection />
      </div>
      <PopupDisplayHome />
      <PopupDisplayBal />
      <HomeBoxList />
      <HomeBookSelection />
    </>
  );
}
