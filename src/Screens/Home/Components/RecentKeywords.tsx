import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { Colors } from '../../../Theme/Color';
import { Fonts, fontsSize } from '../../../Theme/fonts';
import { Spacing } from '../../../Theme/Spacing';

type Props = {
  keywords: string[];
  onPressKeyword: (word: string) => void;
};

const RecentKeywords = ({ keywords, onPressKeyword }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recent Keywords</Text>
      <FlatList
        data={keywords}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => `${item}-${index}`}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.pill}
            activeOpacity={0.8}
            onPress={() => onPressKeyword(item)}
          >
            <Text style={styles.pillText}>{item}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

export default RecentKeywords;

const styles = StyleSheet.create({
  container: {
    marginVertical: Spacing.md,
  },
  title: {
    fontSize: fontsSize.smd,
    fontFamily: Fonts.senBold,
    color: Colors.subtitleColor,
    marginBottom: Spacing.md,
   
  },
  listContent: {
  
    gap: 10,
  },
  pill: {
    borderWidth: 1,
    borderColor: '#ECEFF1',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: Colors.white,
  },
  pillText: {
    fontSize: fontsSize.sm,
    fontFamily: Fonts.senRegular,
    color: Colors.semiBlack,
  },
});
