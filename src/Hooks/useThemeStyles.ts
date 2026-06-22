import { useTheme } from './useTheme';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

export const useThemeStyles = <T extends StyleSheet.NamedStyles<T>>(
  factory: (colors: any) => T
): T => {
  const { colors } = useTheme();
  return useMemo(() => factory(colors), [colors, factory]);
};
