import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createJSONStorage, persist } from 'zustand/middleware';
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
            code
          }));
          set({
            rates: ratesArray,
            lastUpdated: new Date().toISOString(),
            isLoading: false
          });
        } catch (error) {
          set({ error: (error instanceof Error) ? error.message : 'An unknown error occurred', isLoading: false });
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