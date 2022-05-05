import React, { useState } from 'react';
import PopupDisplayHome from '../components/PopupDisplayHome';
import Mapsection from '../components/Mapmodule';
import HomeBookSelection from '../components/HomeBookSelection';
import HomeBoxList from '../components/HomeBoxList';
import localisationPointer from '../assets/localisation.png';
import '../styles/Home.css';

export default function Home() {
  const [postalCode, setPostalCode] = useState({
    cp: '69001',
    id: '',
    address: '',
  });

  const [userLocation, setUserLocation] = useState(null);

  const handleLocation = () => {
    console.log(navigator.geolocation);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((p) => {
        setUserLocation([p.coords.latitude, p.coords.longitude]);
      });
    }
  };

  return (
    <>
      <div className="mapContainer">
        <div>
          <img
            onClick={handleLocation}
            className="localPointer"
            src={localisationPointer}
            alt=""
          />
        </div>
        <Mapsection setCP={setPostalCode} userLocation={userLocation} />
      </div>
      <PopupDisplayHome />
      <HomeBoxList CP={postalCode} />
      <HomeBookSelection />
    </>
  );
}
