// api.js
import axios from "axios";
const API_URL = process.env.API_URL;

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
