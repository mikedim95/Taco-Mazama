// api.js
import axios from "axios";

const API_URL = "localhost:4000/order"; // Replace with your API endpoint

const postJsonData = async (jsonData) => {
  try {
    const response = await axios.post(API_URL, jsonData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export default postJsonData;
