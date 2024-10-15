import create from "zustand";
import { persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchCurrencyRates } from "../api/currencyApi";

const useCurrencyStore = create(
  persist(
    (set, get) => ({
      rates: [],
      lastUpdated: null,
      isLoading: false,
      error: null,
      fetchRates: async () => {
        set({ isLoading: true, error: null });
        try {
          const data = await fetchCurrencyRates();
          const ratesArray = Object.entries(data).map(([code, info]) => ({
            code,
            ...info,
          }));
          set({
            rates: ratesArray,
            lastUpdated: new Date().toISOString(),
            isLoading: false,
          });
        } catch (error) {
          set({ error: error.message, isLoading: false });
        }
      },
      getHighestAndLowestRates: () => {
        const { rates } = get();
        if (rates.length === 0) return { highest: null, lowest: null };

        const sorted = [...rates].sort((a, b) => b.rate - a.rate);
        return {
          highest: sorted[0],
          lowest: sorted[sorted.length - 1],
        };
      },
    }),
    {
      name: "currency-store",
      getStorage: () => AsyncStorage,
    }
  )
);

export default useCurrencyStore;
