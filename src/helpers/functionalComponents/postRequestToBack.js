// api.js
import axios from "axios";

const API_URL = "https://taco-mazama-api.onrender.com:3000/order"; // Replace with your API endpoint

const postJsonData = async (jsonData) => {
  try {
    const response = await axios.post(API_URL, {
      jsonData,
    });
    console.error(response.data);
  } catch (error) {
    console.error("Error:", error);
  }
};

export default postJsonData;
