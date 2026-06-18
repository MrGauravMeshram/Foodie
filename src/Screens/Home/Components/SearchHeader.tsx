import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import LeftArrow from '../../../Components/LeftArrow';
import { Colors } from '../../../Theme/Color';
import { Fonts, fontsSize } from '../../../Theme/fonts';
import { Spacing } from '../../../Theme/Spacing';
import { styles } from '../../../Styles/SearchBarHeaderStyle';



const SearchHeader = ({
  icon,
  title,
  data,
  selectedValue,
  onSelect,
  showFilter = false,
  onFilterPress,
}: any) => {
  const navigation = useNavigation();
  const [open, setOpen] = useState(false);

  const hasData = data && data.length > 0;

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.8}>
          <LeftArrow containerStyle={styles.backButton} />
        </TouchableOpacity>

        {hasData ? (
          <View style={styles.dropdownWrapper}>
            <TouchableOpacity
              style={styles.pillButton}
              onPress={() => setOpen(!open)}
              activeOpacity={0.8}
            >
              <Text style={styles.pillText}>
                {String(selectedValue || title).toUpperCase()}
              </Text>
              <Feather
                name={open ? 'chevron-up' : 'chevron-down'}
                size={14}
                color={Colors.btnColor}
                style={styles.pillChevron}
              />
            </TouchableOpacity>

            {open && (
              <>
                <TouchableWithoutFeedback onPress={() => setOpen(false)}>
                  <View style={styles.overlay} />
                </TouchableWithoutFeedback>
                <View style={styles.dropdownMenu}>
                  <ScrollView bounces={false} style={styles.dropdownScroll}>
                    {data.map((item: any) => (
                      <TouchableOpacity
                        key={item.id || item.title}
                        style={styles.dropdownItem}
                        onPress={() => {
                          if (onSelect) {
                            onSelect(item);
                          }
                          setOpen(false);
                        }}
                      >
                        <Text
                          style={[
                            styles.dropdownItemText,
                            (selectedValue === item.title || selectedValue === item.id) &&
                            styles.selectedItemText,
                          ]}
                        >
                          {item.title}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              </>
            )}
          </View>
        ) : (
          <Text style={styles.title}>{title}</Text>
        )}
      </View>

      <View style={styles.rightSection}>
        {icon && (
          <TouchableOpacity style={styles.cartContainer} activeOpacity={0.8}>
            <Feather name={icon} color={Colors.whiteIcon} size={22} />
          </TouchableOpacity>
        )}

        {showFilter && (
          <TouchableOpacity
            style={styles.filterButton}
            activeOpacity={0.8}
            onPress={onFilterPress}
          >
            <Feather name="sliders" color={Colors.semiBlack} size={20} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default SearchHeader;
