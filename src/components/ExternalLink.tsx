import { openBrowserAsync } from 'expo-web-browser';
import React from 'react';
import { Platform, Pressable, Text } from 'react-native';

type Props = {
  href: string;
  children: React.ReactNode;
};

export function ExternalLink({ href, children, ...rest }: Props) {
  const handlePress = async () => {
    if (Platform.OS !== 'web') {
      await openBrowserAsync(href);
    } else {
      window.open(href, '_blank');
    }
  };

  return (
    <Pressable onPress={handlePress} {...rest}>
      <Text>{children}</Text>
    </Pressable>
  );
}
