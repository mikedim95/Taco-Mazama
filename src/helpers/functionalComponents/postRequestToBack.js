import axios from "axios";

const postJsonData = async (jsonData) => {
  console.log(jsonData);
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

    // Check for a non-OK status and throw an error if needed
    if (response.status !== 200) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    return response;
  } catch (error) {
    throw error; // Throw the error to ensure it's caught in the catch block in the main workflow
  }
};

export default postJsonData;
