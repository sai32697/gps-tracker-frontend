import React, { useEffect, useState } from "react";
import Map, { Marker } from "react-map-gl"; // Correct import for react-map-gl v7
import "mapbox-gl/dist/mapbox-gl.css";
import { getBusLocation } from "../api";

const MAPBOX_TOKEN = 'pk.eyJ1IjoiZ25hbmFzYWkxMjMiLCJhIjoiY204Mzh4NmphMGdhNDJscXZmd2pnb3ZrOCJ9.Cp-WLG0aK9wVlbTEUBaItA'; // Replace with your token

const BusMap = () => {
    const [busLocation, setBusLocation] = useState({ lat: 0, lon: 0 });
    const [viewport, setViewport] = useState({
        latitude: 0,
        longitude: 0,
        zoom: 15,
    });

    useEffect(() => {
        const fetchLocation = async () => {
            const location = await getBusLocation();
            setBusLocation(location);

            // ✅ Using functional update to avoid dependency warnings
            setViewport(v => ({
                ...v,
                latitude: location.lat,
                longitude: location.lon
            }));
        };

        fetchLocation();
        const interval = setInterval(fetchLocation, 5000);

        return () => clearInterval(interval);
    }, []); // ✅ No need to include 'viewport' in dependency array

    return (
        <Map
            initialViewState={viewport}
            style={{ width: "100%", height: "500px" }}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            mapboxAccessToken={MAPBOX_TOKEN}
            onMove={evt => setViewport(evt.viewState)}
        >
            <Marker latitude={busLocation.lat} longitude={busLocation.lon}>
                <span role="img" aria-label="bus" style={{ fontSize: "24px" }}>🚌</span>
            </Marker>
        </Map>
    );
};

export default BusMap;