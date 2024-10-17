import CurrencyList from '@/src/components/CurrencyList';
import { Colors } from '@/src/styles/colors';
import * as React from 'react';
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';

export default function HomeScreen() {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      <SafeAreaView style={styles.container}>
        <CurrencyList />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});