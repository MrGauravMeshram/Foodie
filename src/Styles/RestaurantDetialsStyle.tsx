import { StyleSheet } from "react-native";
import { Colors } from "../Theme/Color";
import { Dimensions } from "react-native";
import { Padding,Spacing } from "../Theme/Spacing";
import {Fonts,fontsSize} from '../Theme/fonts'

const { width: screenWidth } = Dimensions.get("window");

export const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  imageContainer: {
    width: screenWidth,
    height: 370,
    position: 'relative',
  },
  banner: {
    width: screenWidth,
    height: 370,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  circleButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.white,
    position: 'absolute',
    top: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  backBtn: {
    left: 20,
  },
  moreBtn: {
    right: 20,
  },
  paginationDots: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    gap: 8,
    alignItems: 'center',
  },
  activeDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.white,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  inactiveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  detailsWrapper: {
    paddingHorizontal: Padding.lPadding,
    marginTop: Spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 25,
    marginBottom: 10,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoText: {
    fontFamily: Fonts.senMedium,
    fontSize: fontsSize.sm,
    color: Colors.subtitleColor,
  },
  restaurantName: {
    fontFamily: Fonts.senBold,
    fontSize: fontsSize.large,
    color: Colors.black,
    marginVertical: 8,
  },
  description: {
    fontFamily: Fonts.senRegular,
    fontSize: fontsSize.sm,
    color: Colors.lightGrey,
    lineHeight: 20,
  },
  pillsContainer: {
    paddingHorizontal: Padding.lPadding,
    gap: 12,
    marginVertical: 20,
    height: 45,
  },
  pill: {
    height: 40,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pillText: {
    fontSize: fontsSize.sm,
  },
  foodSectionHeader: {
    paddingHorizontal: Padding.lPadding,
    marginBottom: Spacing.md,
  },
  foodSectionTitle: {
    fontFamily: Fonts.senSemiBold,
    fontSize: fontsSize.md,
    color: Colors.black,
  },
  gridContainer: {
    paddingHorizontal: Padding.lPadding - 4,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 40,
  },
  foodCard: {
    width: '48%',
    backgroundColor: Colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    marginBottom: 16,
    padding: 10,
    elevation: 2,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  foodImageWrapper: {
    width: '100%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  foodImage: {
    width: '90%',
    height: '90%',
    borderRadius: 8,
    resizeMode: 'cover',
  },
  foodDetails: {
    width: '100%',
  },
  foodTitle: {
    fontFamily: Fonts.senBold,
    fontSize: fontsSize.sm,
    color: Colors.black,
  },
  foodRestaurant: {
    fontFamily: Fonts.senRegular,
    fontSize: fontsSize.exsm,
    color: Colors.lightGrey,
    marginVertical: 4,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  foodPrice: {
    fontFamily: Fonts.senBold,
    fontSize: fontsSize.sm,
    color: Colors.black,
  },
  addButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.btnColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
});