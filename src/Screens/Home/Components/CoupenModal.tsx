import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';
import Svg, { Polygon, Path } from 'react-native-svg';
import { Colors } from '../../../Theme/Color';
import { Fonts } from '../../../Theme/fonts';

type Props = {
  isVisible: boolean;
  onClose: () => void;
};

const CouponModal = ({ isVisible, onClose }: Props) => {
  return (
    <Modal
      isVisible={isVisible}
      animationIn="zoomIn"
      animationOut="zoomOut"
      backdropOpacity={0.5}
      useNativeDriver
      onBackdropPress={onClose}
    >
      <View style={styles.modalWrapper}>
        <LinearGradient
          colors={[Colors.couponGradStart, Colors.couponGradMiddle, Colors.couponGradEnd]}
          style={styles.container}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
        >
        
          <Svg style={StyleSheet.absoluteFill} pointerEvents="none">
            
            <Polygon
              points="35,75 70,70 85,80"
              fill="rgba(255, 255, 255, 0.7)"
            />
            
            <Polygon
              points="35,75 70,70 55,95"
              fill="rgba(255, 255, 255, 0.3)"
            />

            
            <Polygon
              points="170,40 170,52 160,60"
              fill="rgba(255, 255, 255, 0.8)"
            />
            <Polygon
              points="170,40 170,52 185,50"
              fill="rgba(255, 255, 255, 0.4)"
            />

        
            <Polygon
              points="265,55 245,80 230,95"
              fill="rgba(255, 255, 255, 0.7)"
            />
            <Polygon
              points="265,55 245,80 255,105"
              fill="rgba(255, 255, 255, 0.3)"
            />

            {/* Shard 4 (Middle Left) */}
            <Polygon
              points="105,155 122,163 135,160"
              fill="rgba(255, 255, 255, 0.7)"
            />
            <Polygon
              points="105,155 122,163 120,175"
              fill="rgba(255, 255, 255, 0.3)"
            />

            {/* Shard 5 (Left bottom-ish) */}
            <Polygon
              points="100,225 117,233 130,230"
              fill="rgba(255, 255, 255, 0.7)"
            />
            <Polygon
              points="100,225 117,233 115,245"
              fill="rgba(255, 255, 255, 0.3)"
            />

           
            <Path
              d="M265,175 C275,185 275,195 265,205 C255,215 255,225 265,235"
              fill="none"
              stroke="rgba(255, 255, 255, 0.6)"
              strokeWidth={8}
              strokeLinecap="round"
            />
            <Path
              d="M267,177 C277,187 277,197 267,207 C257,217 257,227 267,237"
              fill="none"
              stroke="rgba(255, 255, 255, 0.3)"
              strokeWidth={3}
              strokeLinecap="round"
            />
          </Svg>

          <Text style={styles.title}>Hurry Offers!</Text>

          <Text style={styles.code}>#1243CD2</Text>

          <Text style={styles.description}>
            Use the cupon get 25% discount
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={onClose}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>GOT IT</Text>
          </TouchableOpacity>
        </LinearGradient>

        <TouchableOpacity
          style={styles.closeBtn}
          onPress={onClose}
          activeOpacity={0.8}
        >
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default CouponModal;

const styles = StyleSheet.create({
  modalWrapper: {
    alignSelf: 'center',
    width: 320,
    overflow: 'visible',
  },
  container: {
    borderRadius: 30,
    paddingHorizontal: 25,
    paddingTop: 45,
    paddingBottom: 35,
    alignItems: 'center',
    width: '100%',
    position: 'relative',
    overflow: 'hidden', // clips the linear gradient inside card borders
  },
  closeBtn: {
    position: 'absolute',
    top: -12,
    right: -12,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.couponCloseBg,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    // Shadow for elevation
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  closeText: {
    fontSize: 18,
    color: Colors.couponCloseText,
    fontFamily: Fonts.senBold,
    textAlign: 'center',
    marginTop: -2,
  },
  title: {
    marginTop: 25,
    fontSize: Colors.couponTitleSize,
    fontFamily: Fonts.senBold,
    color: Colors.white,
    textAlign: 'center',
  },
  code: {
    marginTop: 30,
    fontSize: Colors.couponCodeSize,
    fontFamily: Fonts.senBold,
    color: Colors.white,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  description: {
    marginTop: 25,
    color: Colors.white,
    fontSize: Colors.couponDescSize,
    fontFamily: Fonts.senRegular,
    textAlign: 'center',
    lineHeight: 22,
  },
  button: {
    marginTop: 35,
    width: '100%',
    borderWidth: 2,
    borderColor: Colors.white,
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    backgroundColor: Colors.couponBtnBg,
  },
  buttonText: {
    color: Colors.white,
    fontFamily: Fonts.senBold,
    fontSize: 16,
  },
});