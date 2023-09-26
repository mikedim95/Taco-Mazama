// api.js
import axios from "axios";

const fetchPublicIP = async () => {
  try {
    const response = await axios.get("https://api.ipify.org?format=json");

    return response.data.ip;
  } catch (error) {
    console.error("Error fetching public IP:", error);
    return null;
  }
};

const fetchAPIResponse = async () => {
  try {
    const response = await axios.get(
      "https://taco-mazama-api.onrender.com/utilRoutes"
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching API response:", error);
    return null;
  }
};

export { fetchPublicIP, fetchAPIResponse };
