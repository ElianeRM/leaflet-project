'use client';

import React, { useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-control-geocoder';

interface Pharmacy {
    name: string;
    lat: number;
    lng: number;
}

interface ClosestPharmacyRouteProps {
  pharmacies: Pharmacy[];
}

const ClosestPharmacyRoute: React.FC<ClosestPharmacyRouteProps> = ({ pharmacies }) => {
    const [position, setPosition] = useState<L.LatLng | null>(null);
    const [closestPharmacy, setClosestPharmacy] = useState<Pharmacy | null>(null);
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

        // Trouver la pharmacie la plus proche
        const distances = pharmacies.map(pharmacy => {
            const distance = latLng.distanceTo([pharmacy.lat, pharmacy.lng]);
            return { pharmacy, distance };
        });

        distances.sort((a, b) => a.distance - b.distance);
            setClosestPharmacy(distances[0].pharmacy);
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
    }, [map, pharmacies]);

    useEffect(() => {
        if (position && closestPharmacy) {
            const routingControl = L.Routing.control({
                waypoints: [
                    position,
                    L.latLng(closestPharmacy.lat, closestPharmacy.lng)
                ],
                routeWhileDragging: true,
                geocoder: (L.Control as any).Geocoder.nominatim(),
                lineOptions: {
                    styles: [{ color: 'green', weight: 6 }],
                    extendToWaypoints: true,
                    missingRouteTolerance: 0
                },
                show: false,
            }).addTo(map);

            const controlContainer = document.getElementsByClassName('leaflet-routing-container')[0] as HTMLElement;
            if (controlContainer) {
              controlContainer.style.display = 'none';
            }
            
            return () => {
                map.removeControl(routingControl);
            };
        }
    }, [position, closestPharmacy, map]);

    return null;
};

export default ClosestPharmacyRoute;
