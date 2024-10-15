import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../styles/colors';

interface CurrencyItemProps {
  item: {
    code: string;
    name: string;
    rate: number;
    date: string;
  };
  isHighlight?: boolean;
}

const CurrencyItem: React.FC<CurrencyItemProps> = ({ item, isHighlight }) => {
  return (
    <View
      style={[styles.container, isHighlight && styles.highlightContainer]}
      testID="currency-item-container"
    >
      <View style={styles.codeContainer}>
        <Text style={styles.code}>{item.code}</Text>
      </View>
      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.rate}>Rate: {item.rate.toFixed(4)}</Text>
        <Text style={styles.date}>Last update: {new Date(item.date).toLocaleString()}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    backgroundColor: Colors.white,
  },
  highlightContainer: {
    backgroundColor: Colors.background,
  },
  codeContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  code: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.white,
  },
  details: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text,
    marginBottom: 4,
  },
  rate: {
    fontSize: 14,
    color: Colors.lightText,
    marginBottom: 2,
  },
  date: {
    fontSize: 12,
    color: Colors.lightText,
  },
});

export default CurrencyItem;