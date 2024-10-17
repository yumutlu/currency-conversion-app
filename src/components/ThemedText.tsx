import React from 'react';
import { Text, TextProps } from 'react-native';
import { Colors } from '@/src/styles/colors';

interface ThemedTextProps extends TextProps {
  type?: 'default' | 'title' | 'link';
}

export function ThemedText({ type = 'default', style, ...props }: ThemedTextProps) {
  let textStyle = {};
  switch (type) {
    case 'title':
      textStyle = { fontSize: 20, fontWeight: 'bold', color: Colors.text };
      break;
    case 'link':
      textStyle = { color: Colors.primary, textDecorationLine: 'underline' };
      break;
    default:
      textStyle = { color: Colors.text };
  }

  return <Text style={[textStyle, style]} {...props} />;
}