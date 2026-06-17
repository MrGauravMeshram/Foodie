import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    useWindowDimensions,
} from 'react-native';
import { SvgProps } from 'react-native-svg';
import { Colors } from '../../../../Theme/Color';

export type OnboardingItemType = {
    id: string;
    title: string;
    description: string;
    image: React.FC<SvgProps>;
};

type OnboardingItemProps = {
    item: OnboardingItemType;
};

export const OnboardingItem = ({ item }: OnboardingItemProps) => {
    const ImageComponent = item.image;
    const { width } = useWindowDimensions();

    return (
        <View style={[styles.container, { width }]}>
            <View style={styles.imageContainer}>
                <ImageComponent
                    width={width * 0.7}
                    height={width * 0.7}
                />
            </View>

            <Text style={styles.title}>
                {item.title}
            </Text>

            <Text style={styles.description}>
                {item.description}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 24,
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 290,
        width: '100%',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontFamily: 'Sen-Bold',
        textAlign: 'center',
        color: '#32343E',
        marginBottom: 16,
    },
    description: {
        fontSize: 16,
        fontFamily: 'Sen-Regular',
        textAlign: 'center',
        color: Colors.lightGrey,
        lineHeight: 24,
        paddingHorizontal: 16,
    },
});