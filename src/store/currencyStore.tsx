import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchCurrencyRates, CurrencyInfo } from '../api/currencyApi';

interface CurrencyState {
  rates: CurrencyInfo[];
  lastUpdated: string | null;
  isLoading: boolean;
  error: string | null;
  fetchRates: () => Promise<void>;
  getHighestAndLowestRates: () => { highest: CurrencyInfo | null; lowest: CurrencyInfo | null };
}

const useCurrencyStore = create<CurrencyState>()(
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
            ...info,
            code,
            rate: parseFloat(info.rate.toFixed(4)) // Ensure rate is a number and rounded to 4 decimal places
          }));
          set({
            rates: ratesArray,
            lastUpdated: new Date().toISOString(),
            isLoading: false
          });
        } catch (error) {
          set({ error: (error as Error).message, isLoading: false });
        }
      },
      getHighestAndLowestRates: () => {
        const { rates } = get();
        if (rates.length === 0) return { highest: null, lowest: null };

        const sorted = [...rates].sort((a, b) => b.rate - a.rate);
        return {
          highest: sorted[0],
          lowest: sorted[sorted.length - 1]
        };
      }
    }),
    {
      name: 'currency-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useCurrencyStore;