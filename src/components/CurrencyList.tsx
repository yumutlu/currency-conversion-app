import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import useCurrencyStore from '../store/currencyStore';
import CurrencyItem from './CurrencyItem';
import { Colors } from '../styles/colors';

const CurrencyList: React.FC = () => {
  const { rates, fetchRates, isLoading, error, getHighestAndLowestRates, getSortedRates } = useCurrencyStore();

  useEffect(() => {
    fetchRates();
    const interval = setInterval(fetchRates, 10000);
    return () => clearInterval(interval);
  }, [fetchRates]);

  const { highest, lowest } = getHighestAndLowestRates();
  const sortedRates = getSortedRates();

  if (isLoading && rates.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorMessage}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Currency Conversion Rates</Text>
      {highest && lowest && (
        <View style={styles.highlightContainer}>
          <Text style={styles.highlightTitle}>Highest and Lowest Rates:</Text>
          <CurrencyItem item={highest} isHighlight />
          <CurrencyItem item={lowest} isHighlight />
        </View>
      )}
      <FlatList
        data={sortedRates}
        renderItem={({ item }) => <CurrencyItem item={item} />}
        keyExtractor={(item) => item.code}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    textAlign: 'center',
    marginVertical: 16,
  },
  errorMessage: {
    fontSize: 18,
    color: Colors.error,
    textAlign: 'center',
  },
  highlightContainer: {
    backgroundColor: Colors.white,
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  highlightTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
  },
  separator: {
    height: 1,
    backgroundColor: Colors.border,
  },
});

export default CurrencyList;