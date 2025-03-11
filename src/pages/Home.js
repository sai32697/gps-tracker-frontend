import React, { useEffect, useState } from "react";
import BusMap from "../components/BusMap";
import { getBusLocation } from "../api";

const Home = () => {
    const [busLocation, setBusLocation] = useState({ lat: 0, lon: 0 });

    useEffect(() => {
        const fetchLocation = async () => {
            const location = await getBusLocation();
            setBusLocation(location);
        };

        fetchLocation();
        const interval = setInterval(fetchLocation, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h1>🚌 Real-Time Bus Tracker</h1>
            <p>Latitude: {busLocation.lat} | Longitude: {busLocation.lon}</p>
            <BusMap />
        </div>
    );
};

export default Home;