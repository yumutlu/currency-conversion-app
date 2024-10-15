import axios from "axios";

const API_URL = "https://www.floatrates.com/daily/usd.json";

export const fetchCurrencyRates = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching currency rates:", error);
    throw error;
  }
};
