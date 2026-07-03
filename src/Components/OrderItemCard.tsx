import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../Hooks/useTheme';
import { useThemeStyles } from '../Hooks/useThemeStyles';
import { Fonts, fontsSize } from '../Theme/fonts';
import { OrderItem } from '../Data/MyOrdersData';

interface OrderItemCardProps {
  item: OrderItem;
  activeTab: 'Ongoing' | 'History';
  onTrackOrder?: (item: OrderItem) => void;
  onCancelOrder?: (item: OrderItem) => void;
  onReorder?: (item: OrderItem) => void;
}

const OrderItemCard = ({
  item,
  activeTab,
  onTrackOrder,
  onCancelOrder,
  onReorder,
}: OrderItemCardProps) => {
  const { colors } = useTheme();
  const styles = useThemeStyles(getStyles);
  const isOngoing = activeTab === 'Ongoing';

  return (
    <View style={styles.cardContainer}>
      <View style={styles.contentRow}>
        <View style={styles.imageWrapper}>
          <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.titleRow}>
            <Text style={styles.restaurantName} numberOfLines={1}>
              {item.restaurant}
            </Text>
            <Text style={styles.orderNo}>{item.orderNo}</Text>
          </View>
          <View style={styles.detailsRow}>
            <Text style={styles.price}>${item.price.toFixed(2)}</Text>
            <View style={styles.verticalDivider} />
            <Text style={styles.itemsCount}>
              {String(item.items).padStart(2, '0')} Items
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.buttonRow}>
        {isOngoing ? (
          <>
            <TouchableOpacity
              style={[styles.button, styles.trackButton]}
              onPress={() => onTrackOrder?.(item)}
              activeOpacity={0.8}
            >
              <Text style={styles.trackButtonText}>Track Order</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={() => onCancelOrder?.(item)}
              activeOpacity={0.8}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity
              style={[styles.button, styles.trackButton]}
              onPress={() => onReorder?.(item)}
              activeOpacity={0.8}
            >
              <Text style={styles.trackButtonText}>Reorder</Text>
            </TouchableOpacity>
            <View style={styles.statusContainer}>
              <Text
                style={[
                  styles.statusText,
                  item.status === 'Completed' ? styles.statusSuccess : styles.statusCancel,
                ]}
              >
                {item.status}
              </Text>
            </View>
          </>
        )}
      </View>
    </View>
  );
};

const getStyles = (colors: any) =>
  StyleSheet.create({
    cardContainer: {
      backgroundColor: colors.white,
      paddingVertical: 16,
      marginBottom: 20,
    },
    contentRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    imageWrapper: {
      width: 76,
      height: 76,
      borderRadius: 16,
      overflow: 'hidden',
      backgroundColor: colors.sideBarIcon,
    },
    image: {
      width: '100%',
      height: '100%',
    },
    infoContainer: {
      flex: 1,
      marginLeft: 16,
      justifyContent: 'center',
    },
    titleRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },
    restaurantName: {
      fontFamily: Fonts.senBold,
      fontSize: fontsSize.md,
      color: colors.black,
      flex: 1,
      marginRight: 8,
    },
    orderNo: {
      fontFamily: Fonts.senRegular,
      fontSize: fontsSize.sm,
      color: colors.lightGrey,
      textDecorationLine: 'underline',
    },
    detailsRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    price: {
      fontFamily: Fonts.senBold,
      fontSize: fontsSize.sm,
      color: colors.black,
    },
    verticalDivider: {
      width: 1,
      height: 14,
      backgroundColor: '#E0E0E0',
      marginHorizontal: 12,
    },
    itemsCount: {
      fontFamily: Fonts.senRegular,
      fontSize: fontsSize.sm,
      color: colors.lightGrey,
    },
    buttonRow: {
      flexDirection: 'row',
      marginTop: 16,
      gap: 16,
    },
    button: {
      flex: 1,
      height: 48,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1.5,
    },
    trackButton: {
      backgroundColor: colors.btnColor,
      borderColor: colors.btnColor,
    },
    trackButtonText: {
      fontFamily: Fonts.senBold,
      fontSize: fontsSize.sm,
      color: colors.white,
    },
    cancelButton: {
      backgroundColor: colors.white,
      borderColor: colors.btnColor,
    },
    cancelButtonText: {
      fontFamily: Fonts.senBold,
      fontSize: fontsSize.sm,
      color: colors.btnColor,
    },
    statusContainer: {
      flex: 1,
      height: 48,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.sideBarIcon,
    },
    statusText: {
      fontFamily: Fonts.senBold,
      fontSize: fontsSize.sm,
    },
    statusSuccess: {
      color: colors.success,
    },
    statusCancel: {
      color: colors.cancel,
    },
  });

export default OrderItemCard;
