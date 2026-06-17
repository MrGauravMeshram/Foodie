import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,

    StatusBar,
    Alert,
} from 'react-native';
import { ONBOARDING_DATA } from '../../../Data/OnBoadingScreenData';
import { OnboardingItem } from './Component/OnBoardingItem';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../../Components/Button';
import { Colors } from '../../../Theme/Color';
import { styles } from './OnBoardingStyle';

const OnBoarding = ({ navigation }: any) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        if (currentIndex < ONBOARDING_DATA.length - 1) {
            setCurrentIndex(prevIndex => prevIndex + 1);
        } else {
            navigation.navigate("Login")
        }
    };

    const handleSkip = () => {
       navigation.navigate("Login")
    };

    const currentItem = ONBOARDING_DATA[currentIndex];
    const isLastSlide = currentIndex === ONBOARDING_DATA.length - 1;

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.backgroundColor || "#FFFFFF"} />

            <View style={styles.contentContainer}>
                <OnboardingItem item={currentItem} />
            </View>
            <View style={styles.dotsContainer}>
                {ONBOARDING_DATA.map((_, index) => {
                    const isActive = index === currentIndex;
                    return (
                        <View
                            key={index}
                            style={[
                                styles.dot,
                                isActive ? styles.activeDot : styles.inactiveDot,
                            ]}
                        />
                    );
                })}
            </View>

            <View style={styles.buttonContainer}>
                <Button
                    title={isLastSlide ? "GET STARTED" : "NEXT"}
                    onPress={handleNext}
                />

                {!isLastSlide ? (
                    <TouchableOpacity
                        onPress={handleSkip}
                        activeOpacity={0.7}
                        style={styles.skipButton}
                    >
                        <Text style={styles.skipText}>Skip</Text>
                    </TouchableOpacity>
                ) : (
                    <View style={styles.skipPlaceholder} />
                )}
            </View>
        </SafeAreaView>
    );
};

export default OnBoarding;

