import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Pressable, Dimensions, LayoutChangeEvent } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Extrapolation,
  runOnJS,
} from 'react-native-reanimated';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface CustomBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  isDarkMode?: boolean;
}

export const CustomBottomSheet: React.FC<CustomBottomSheetProps> = ({
  isOpen,
  onClose,
  children,
  isDarkMode = false,
}) => {
  const [shouldRender, setShouldRender] = useState(isOpen);
  const sheetHeight = useSharedValue(SCREEN_HEIGHT);
  const translateY = useSharedValue(SCREEN_HEIGHT);
  const context = useSharedValue(0);

  const onLayout = (event: LayoutChangeEvent) => {
    const layoutHeight = event.nativeEvent.layout.height;
    if (layoutHeight > 0 && sheetHeight.value !== layoutHeight) {
      sheetHeight.value = layoutHeight;
    }
  };

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      translateY.value = withTiming(0, { duration: 250 });
    } else {
      translateY.value = withTiming(sheetHeight.value, { duration: 250 }, (finished) => {
        if (finished) {
          runOnJS(setShouldRender)(false);
        }
      });
    }
  }, [isOpen]);

  const panGesture = Gesture.Pan()
    .onStart(() => {
      context.value = translateY.value;
    })
    .onUpdate((event) => {
      const nextY = context.value + event.translationY;
      translateY.value = Math.max(-15, nextY);
    })
    .onEnd((event) => {
      if (event.velocityY > 500 || translateY.value > sheetHeight.value * 0.3) {
        translateY.value = withTiming(sheetHeight.value, { duration: 200 }, (finished) => {
          if (finished) {
            runOnJS(onClose)();
          }
        });
      } else {
        translateY.value = withTiming(0, { duration: 200 });
      }
    });

  const animatedSheetStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  const animatedBackdropStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateY.value,
      [0, sheetHeight.value],
      [0.6, 0],
      Extrapolation.CLAMP
    );

    return {
      opacity,
    };
  });

  const handleClose = () => {
    translateY.value = withTiming(sheetHeight.value, { duration: 200 }, (finished) => {
      if (finished) {
        runOnJS(onClose)();
      }
    });
  };

  if (!shouldRender) {
    return null;
  }

  return (
    <View 
      pointerEvents={isOpen ? 'auto' : 'none'}
      style={styles.container}
    >
      {/* Backdrop */}
      <Animated.View style={[styles.backdrop, animatedBackdropStyle]}>
        <Pressable style={styles.backdropPressable} onPress={handleClose} />
      </Animated.View>

      {/* Bottom Sheet Card */}
      <GestureDetector gesture={panGesture}>
        <Animated.View
          onLayout={onLayout}
          style={[
            styles.sheet,
            { backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF' },
            animatedSheetStyle,
          ]}
        >
          {/* Handle */}
          <View
            style={[
              styles.handle,
              { backgroundColor: isDarkMode ? '#475569' : '#E2E8F0' },
            ]}
          />
          <View style={styles.content}>{children}</View>
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 9999,
    elevation: 9999,
  },
  backdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#000000',
    zIndex: 1,
    elevation: 1,
  },
  backdropPressable: {
    flex: 1,
  },
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10000,
    zIndex: 10,
    paddingBottom: 32,
  },
  handle: {
    width: 40,
    height: 5,
    borderRadius: 3,
    alignSelf: 'center',
    marginTop: 12,
  },
  content: {
    width: '100%',
  },
});
