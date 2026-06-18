import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Colors } from '../../Theme/Color';
import SearchHeader from './Components/SearchHeader';
import SearchBar from '../../Components/SearchBar';
import RecentKeywords from './Components/RecentKeywords';
import SuggestedRestaurants from './Components/SuggestedRestaurants';
import PopularFastFood from './Components/PopularFastFood';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    RecentKeywordsData,
    SuggestedRestaurantsData,
    PopularFastFoodData,
} from '../../Data/SearchScreenData';
import { Padding } from '../../Theme/Spacing';

const SearchScreen = () => {
    const [searchText, setSearchText] = useState('');

    const handleKeywordPress = (word: string) => {
        setSearchText(word);
    };

    return (
        <SafeAreaView style={styles.container}>
            <SearchHeader />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <View style={styles.searchBarWrapper}>
                    <SearchBar
                        value={searchText}
                        onChangeText={setSearchText}
                        placeholder="Pizza"
                    />
                </View>

                <RecentKeywords
                    keywords={RecentKeywordsData}
                    onPressKeyword={handleKeywordPress}
                />

                <SuggestedRestaurants
                    data={SuggestedRestaurantsData}
                />

                <PopularFastFood
                    data={PopularFastFoodData}
                />
            </ScrollView>
        </SafeAreaView>
    );
};

export default SearchScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backgroundColor,
        paddingHorizontal:Padding.mPadding
    },
    scrollContent: {
        paddingBottom: 30,
    },
    searchBarWrapper: {
        paddingHorizontal: 24,
        marginTop: 10,
        marginBottom: 10,
    },
});