'use client'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import React, { useEffect } from 'react';
import { faHouseMedical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createRoot } from 'react-dom/client';
import CurrentLocationMarker from './position';
import ClosestPharmacyRoute from './itineraire';

let iconRetinaUrl = 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png'
const iconUrl = 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png';
const shadowUrl = '';


L.Icon.Default.mergeOptions({
    iconRetinaUrl,
    iconUrl,
    shadowUrl,
});

const Map = () => {
  
    const pharmacies = [
      { name: "pharmacie Centrale du Sud", lat: -21.448230539624287, lng: 47.08560244507855 },
      { name: "pharmacie Ezaka", lat: -21.45631, lng: 47.09049 },
      { name: "pharmacie des plateux", lat: -21.444873303762623, lng: 47.08972153836213 },
      { name: "pharmacie Lam Seck",lat :-21.445512509005393,lng: 47.08955015135034},
      { name: "Pharmacie du Betsileo", lat:-21.44119774750452,lng: 47.09092162885632},
      { name: "Pharmacie Sandratra", lat:-21.43511993560223, lng : 47.10225057290052},
      { name: "Pharmacie mamisoa", lat : -21.425590187934965, lng: 47.11456001012264},
      { name: "Pharmacie SOAVA" , lat : -21.45415,lng :47.08834},
      { name: "Pharmacie de CSBII Anjoma",lat :-21.45563,lng :47.08855},
      { name : "Homeopharma" , lat : -21.44638, lng :47.08911}
    ];

    const createCustomIcon = (icon:any) => {
        const div = document.createElement('div');
        createRoot(div).render(icon);
        return L.divIcon({
        html: div,
        className: 'custom-icon text-red-600',
        });
    };

    return (
        <div className='flex flex-row items-center h-full'>
            <div className='w-[300px] bg-white h-full text flex flex-col p-2 rounded-sm'>
                <h1 className='bg-gray-50 p-2 rounded-sm mb-4'>Bienvenu sur Maps<span className='text-green-400'>Pharma</span></h1>
                <div className=''>
                <button className='w-full rounded-sm p-2 border text-green-400 border-green-400 mb-4 hover:bg-green-400 hover:text-white'>Le plus proche</button>
                <input type="text" placeholder='Recherche' className='w-full rounded-sm p-2 border border-gray-400'  />
                </div>
            </div>
            <MapContainer center={[-21.453611, 47.085833]} zoom={15} scrollWheelZoom={false} style={{ height: '100%', width: '80%' }}>
                <TileLayer
                    url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
                    subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
                    maxZoom={25}
                />
                {pharmacies.map((pharmacy, idx) => (
                <Marker key={idx} position={[pharmacy.lat, pharmacy.lng]} icon={createCustomIcon(<FontAwesomeIcon icon={faHouseMedical} />)}>
                    <Popup>
                    {pharmacy.name}
                    </Popup>
                </Marker>
                ))}
                <CurrentLocationMarker />
                <ClosestPharmacyRoute pharmacies={pharmacies} />
            </MapContainer>
            <div className='w-[300px] bg-white h-full'></div>
        </div>
    );
};

export default Map;
