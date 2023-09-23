// api.js
import axios from "axios";

const testip = async () => {
  try {
    const response = await axios.get("https://api.ipify.org?format=json");
    const publicIP = response.data.ip; // Extract the public IP from the response
    console.log("Public IP:", publicIP);
  } catch (error) {
    console.error("Error getting public IP:", error.message);
  }
};

export default testip;
