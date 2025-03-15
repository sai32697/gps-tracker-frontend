import React, { useEffect, useState } from "react";
import Map, { Marker } from "react-map-gl";
import axios from "axios";
import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const BusMap = () => {
    const [busLocation, setBusLocation] = useState({ lat: 0, lon: 0 });

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/get_location`);
                if (response.data) {
                    setBusLocation(response.data);
                }
            } catch (error) {
                console.error("Error fetching bus location:", error);
            }
        };

        fetchLocation(); // Fetch initially
        const interval = setInterval(fetchLocation, 5000); // Refresh every 5 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <Map
            initialViewState={{
                latitude: busLocation.lat || 16.5279, // Default lat if no data
                longitude: busLocation.lon || 80.5933, // Default lon if no data
                zoom: 15
            }}
            style={{ width: "100%", height: "500px" }}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            mapboxAccessToken={MAPBOX_TOKEN}
        >
            <Marker latitude={busLocation.lat} longitude={busLocation.lon}>
                <span role="img" aria-label="bus" style={{ fontSize: "24px" }}>🚌</span>
            </Marker>
        </Map>
    );
};

export default BusMap;