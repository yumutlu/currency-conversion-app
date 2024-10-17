import React from 'react';
import { View, StyleSheet } from 'react-native';
import CurrencyList from '../../src/components/CurrencyList';
import { Colors } from '../../src/styles/colors';

export default function MainScreen() {
  return (
    <View style={styles.container}>
      <CurrencyList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    marginTop: 30,
  },
});