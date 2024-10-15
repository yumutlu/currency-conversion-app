import axios from 'axios';

const API_URL = 'https://www.floatrates.com/daily/usd.json';

export interface CurrencyInfo {
  code: string;
  alphaCode: string;
  numericCode: string;
  name: string;
  rate: number;
  date: string;
  inverseRate: number;
}

export interface CurrencyData {
  [key: string]: CurrencyInfo;
}

export const fetchCurrencyRates = async (): Promise<CurrencyData> => {
  try {
    const response = await axios.get<CurrencyData>(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching currency rates:', error);
    throw error;
  }
};