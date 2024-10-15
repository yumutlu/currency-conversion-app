import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface CurrencyItemProps {
  item: {
    code: string;
    name: string;
    rate: number;
    date: string;
  };
}

const CurrencyItem: React.FC<CurrencyItemProps> = ({ item }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.code}>{item.code}</Text>
      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.rate}>Rate: {item.rate.toFixed(4)}</Text>
        <Text style={styles.date}>Last update: {new Date(item.date).toLocaleString()}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  code: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 16,
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    marginBottom: 4,
  },
  rate: {
    fontSize: 14,
    color: '#555',
  },
  date: {
    fontSize: 12,
    color: '#888',
  },
});

export default CurrencyItem;