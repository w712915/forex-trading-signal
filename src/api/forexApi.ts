import axios from "axios";
import { ForexData } from "../types/forex";

const API_KEY = import.meta.env.VITE_ALPHA_VANTAGE_API_KEY;
const BASE_URL = "https://www.alphavantage.co/query";

export const getForexData = async (): Promise<ForexData> => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        function: "CURRENCY_EXCHANGE_RATE",
        from_currency: "BTC",
        to_currency: "USD",
        apikey: API_KEY,
      },
    });

    const data = response.data["Realtime Currency Exchange Rate"];
    return {
      timestamp: data["6. Last Refreshed"],
      rate: parseFloat(data["5. Exchange Rate"]),
    };
  } catch (error) {
    console.error("Error fetching crypto data:", error);
    throw error;
  }
};
