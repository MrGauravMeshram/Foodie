import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import LeftArrow from '../../../Components/LeftArrow';
import { getStyles } from '../../../Styles/SearchBarHeaderStyle';
import { useTheme } from '../../../Hooks/useTheme';
import { useThemeStyles } from '../../../Hooks/useThemeStyles';

const SearchHeader = ({
  icon,
  title,
  data,
  selectedValue,
  onSelect,
  showFilter = false,
  onFilterPress = () => void  0,
  color,
  rightText,
  onPress,
  onRightPress,
}: any) => {
  const navigation = useNavigation();
  const [open, setOpen] = useState(false);
  const { colors, isDarkMode } = useTheme();
  const styles = useThemeStyles(getStyles);

  const hasData = data && data.length > 0;

  const isHeaderDark = color || isDarkMode;
  const headerBgColor = isHeaderDark ? colors.backgroundColorBlack : colors.backgroundColor;
  const textTitleColor = isHeaderDark ? colors.white : colors.semiBlack;
  const backBtnBg = isHeaderDark ? colors.semiBlack : colors.sideBarIcon;
  const backArrowColor = isHeaderDark ? colors.white : colors.BlackIcon;

  return (
    <View style={[styles.container, { backgroundColor: headerBgColor }]}>
      <View style={styles.leftSection}>
        <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.8}>
          <LeftArrow 
            containerStyle={[
              styles.backButton,
              { backgroundColor: backBtnBg }
            ]}
            arrowColor={backArrowColor}
          />
        </TouchableOpacity>

        {hasData ? (
          <View style={styles.dropdownWrapper}>
            <TouchableOpacity
              style={styles.pillButton}
              onPress={() => setOpen(!open)}
              activeOpacity={0.8}
            >
              <Text style={[styles.pillText, { color: textTitleColor }]}>
                {String(selectedValue || title).toUpperCase()}
              </Text>
              <Feather
                name={open ? 'chevron-up' : 'chevron-down'}
                size={14}
                color={colors.btnColor}
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
          <Text style={[styles.title, { color: textTitleColor }]}>{title}</Text>
        )}
      </View>

      <View style={styles.rightSection}>
        {icon && (
          <TouchableOpacity style={styles.cartContainer} activeOpacity={0.8} onPress={onPress}>
            <Feather name={icon} color={colors.whiteIcon} size={22} />
          </TouchableOpacity>
        )}

        {showFilter && (
          <TouchableOpacity
            style={styles.filterButton}
            activeOpacity={0.8}
         onPress={() => onFilterPress(true)}
          >
            <Feather name="sliders" color={colors.semiBlack} size={20} />
          </TouchableOpacity>
        )}

        {rightText && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onRightPress}
          >
            <Text style={styles.rightText}>{rightText}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default SearchHeader;

