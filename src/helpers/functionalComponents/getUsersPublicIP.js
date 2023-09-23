// api.js
import axios from "axios";

const getUsersPublicIP = async () => {
  try {
    const response = await axios.get("https://api.ipify.org?format=json");
    const publicIP = response.data.ip; // Extract the public IP from the response
    console.log(`User reports PublicIP: ${publicIP}`);
    return publicIP;
  } catch (error) {
    return null;
  }
};

export default getUsersPublicIP;
