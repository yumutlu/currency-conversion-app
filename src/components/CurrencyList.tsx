import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, RefreshControl } from 'react-native';
import useCurrencyStore from '../store/currencyStore';
import { Colors } from '../styles/colors';
import CurrencyItem from './CurrencyItem';
import { CurrencyInfo } from '../api/currencyApi';

const CurrencyList: React.FC = () => {
  const { rates, fetchRates, isLoading, error, getHighestAndLowestRates, lastUpdated } = useCurrencyStore();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchRates();
    const interval = setInterval(fetchRates, 10000); // Fetch every 10 seconds
    return () => clearInterval(interval);
  }, [fetchRates]);

  const { highest, lowest } = getHighestAndLowestRates();

  const filteredRates = rates.filter((item: CurrencyInfo) =>
    item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = useCallback(({ item }: { item: CurrencyInfo }) => <CurrencyItem item={item} />, []);

  if (error) {
    return <Text style={styles.errorMessage}>Error: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Currency Conversion Rates</Text>
      {lastUpdated && (
        <Text style={styles.lastUpdated}>Last updated: {new Date(lastUpdated).toLocaleString()}</Text>
      )}
      <TextInput
        style={styles.searchInput}
        placeholder="Search currency..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      {highest && lowest && (
        <View style={styles.highlightContainer}>
          <Text style={styles.highlightTitle}>Highest and Lowest Rates:</Text>
          <CurrencyItem item={highest} isHighlight />
          <CurrencyItem item={lowest} isHighlight />
        </View>
      )}
      <FlatList
        data={filteredRates}
        renderItem={renderItem}
        keyExtractor={(item) => item.code}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={fetchRates} colors={[Colors.primary]} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
    textAlign: 'center',
    marginBottom: 8,
  },
  lastUpdated: {
    fontSize: 12,
    color: Colors.lightText,
    textAlign: 'center',
    marginBottom: 16,
  },
  searchInput: {
    height: 40,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  highlightContainer: {
    backgroundColor: Colors.highlight,
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  highlightTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
  },
  errorMessage: {
    fontSize: 18,
    color: Colors.error,
    textAlign: 'center',
    margin: 20,
  },
});

export default CurrencyList;
