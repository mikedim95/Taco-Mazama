import axios from "axios";

const postJsonData = async (jsonData) => {
  try {
    const response = await axios.post(
      "https://taco-mazama-api.onrender.com/order",
      jsonData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data);
  } catch (error) {
    console.error("Error:", error);
  }
};

export default postJsonData;
