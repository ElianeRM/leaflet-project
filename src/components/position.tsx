'use client'

import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { Marker, Popup, useMap } from "react-leaflet";
import L from 'leaflet';

const CurrentLocationMarker: React.FC = () => {
    const createCustomIcon = (icon:any) => {
        const div = document.createElement('div');
        createRoot(div).render(icon);
        return L.divIcon({
          html: div,
          className: 'custom-icon text-blue-600 w-20 h-20',
        });
    };

    const [position, setPosition] = useState<L.LatLng | null>(null);
    const map = useMap();
  
    useEffect(() => {
        if (!navigator.geolocation) {
            console.error('Geolocation is not supported by your browser');
            return;
        }

        const onSuccess = (position: GeolocationPosition) => {
            const { latitude, longitude } = position.coords;
            console.log('Position obtenue:', latitude, longitude); // Log la position pour vérifier les coordonnées
            const latLng = new L.LatLng(latitude, longitude);
            setPosition(latLng);
            map.flyTo(latLng, 13);
        };

        const onError = (error: GeolocationPositionError) => {
            console.error('Unable to retrieve your location:', error.message);
        };

        const watchId = navigator.geolocation.watchPosition(onSuccess, onError, {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        });

        return () => {
            navigator.geolocation.clearWatch(watchId);
        };
    }, [map]);
  
    return position === null ? null : (
        <Marker position={position} icon={createCustomIcon(<FontAwesomeIcon icon={faMapMarkerAlt} />)}>
            <Popup>
                <div className="flex text-start text-slate-900">
                    Vous êtes ici
                </div>
            </Popup>
        </Marker>
    );
};

export default CurrentLocationMarker;
