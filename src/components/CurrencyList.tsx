import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import useCurrencyStore from '../store/currencyStore';
import CurrencyItem from './CurrencyItem';

const CurrencyList: React.FC = () => {
  const { rates, fetchRates, isLoading, error, getHighestAndLowestRates, getSortedRates } = useCurrencyStore();

  useEffect(() => {
    fetchRates();
    const interval = setInterval(fetchRates, 10000); // Fetch every 10 seconds
    return () => clearInterval(interval);
  }, [fetchRates]);

  const { highest, lowest } = getHighestAndLowestRates();
  const sortedRates = getSortedRates();

  if (isLoading && rates.length === 0) {
    return <Text style={styles.message}>Loading...</Text>;
  }

  if (error) {
    return <Text style={styles.message}>Error: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      {highest && lowest && (
        <View style={styles.highlightContainer}>
          <Text style={styles.highlightTitle}>Highest and Lowest Rates:</Text>
          <CurrencyItem item={highest} />
          <CurrencyItem item={lowest} />
        </View>
      )}
      <FlatList
        data={sortedRates}
        renderItem={({ item }) => <CurrencyItem item={item} />}
        keyExtractor={(item) => item.code}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
    margin: 20,
  },
  highlightContainer: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginBottom: 10,
  },
  highlightTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default CurrencyList;