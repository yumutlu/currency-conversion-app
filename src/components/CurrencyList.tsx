import React, { useEffect } from "react";
import { FlatList, StyleSheet, View, Text } from "react-native";
import CurrencyItem from "./CurrencyItem";
import useCurrencyStore from "../store/currencyStore";

const CurrencyList = () => {
  const { rates, fetchRates, isLoading, error, getHighestAndLowestRates } =
    useCurrencyStore();

  useEffect(() => {
    fetchRates();
    const interval = setInterval(fetchRates, 10000); // Fetch every 10 seconds
    return () => clearInterval(interval);
  }, [fetchRates]);

  const { highest, lowest } = getHighestAndLowestRates();

  const renderItem = ({ item }) => <CurrencyItem item={item} />;

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
        data={rates}
        renderItem={renderItem}
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
    textAlign: "center",
    margin: 20,
  },
  highlightContainer: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    marginBottom: 10,
  },
  highlightTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
});

export default CurrencyList;
