// api.js
import axios from "axios";

const API_URL = "https://taco-mazama-api.onrender.com/order"; // Replace with your API endpoint
/* const API_URL = "http://localhost:4000/order"; // Replace with your API endpoint */
const postJsonData = async (jsonData) => {
  console.log(jsonData);
  try {
    const response = await axios.post(API_URL, jsonData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response.data);
  } catch (error) {
    console.error("Error:", error);
  }
};

export default postJsonData;
