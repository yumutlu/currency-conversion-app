import CurrencyList from '@/src/components/CurrencyList';
import { Colors } from '@/src/styles/colors';
import React from 'react';
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';

const App: React.FC = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      <SafeAreaView style={styles.container}>
        <CurrencyList />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});

export default App;