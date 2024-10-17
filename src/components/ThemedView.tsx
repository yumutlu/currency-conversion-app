import React from 'react';
import { View, ViewProps } from 'react-native';
import { Colors } from '@/src/styles/colors';

export function ThemedView(props: ViewProps) {
  return <View style={[{ backgroundColor: Colors.background }, props.style]} {...props} />;
}