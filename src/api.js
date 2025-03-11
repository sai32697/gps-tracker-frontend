import axios from "axios";

const BASE_URL = "https://gps-tracker-uanq.onrender.com";

export const getBusLocation = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/get_location`);
        return response.data;
    } catch (error) {
        console.error("Error fetching location:", error);
        return { lat: 0, lon: 0 };
    }
};

export const updateBusLocation = async (lat, lon) => {
    try {
        await axios.get(`${BASE_URL}/update_location?lat=${lat}&lon=${lon}`);
    } catch (error) {
        console.error("Error updating location:", error);
    }
};