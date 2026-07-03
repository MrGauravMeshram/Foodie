import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { Colors } from '../Theme/Color';
import { Fonts, fontsSize } from '../Theme/fonts';

type AddressBoxProps = {
    title: string;
    address: string;
    iconName?: string;
    iconColor?: string;
    onEdit?: () => void;
    onDelete?: () => void;
}

const AddressBox = ({
    title,
    address,
    iconName = 'home-outline',
    iconColor = '#2B78E4',
    onEdit,
    onDelete
}: AddressBoxProps) => {
    return (
        <View style={styles.Container}>

            <View style={styles.LeftIconContainer}>
                <Ionicons name={iconName} color={iconColor} size={22} />
            </View>


            <View style={styles.ContentContainer}>
                <Text style={styles.Title}>{title}</Text>
                <Text style={styles.AddressText}>{address}</Text>
            </View>


            <View style={styles.ActionsContainer}>
                {onEdit && (
                    <TouchableOpacity onPress={onEdit} style={styles.ActionButton}>
                        <Feather name="edit" color={Colors.btnColor} size={18} />
                    </TouchableOpacity>
                )}
                {onDelete && (
                    <TouchableOpacity onPress={onDelete} style={styles.ActionButton}>
                        <Feather name="trash-2" color={Colors.btnColor} size={18} />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
}

export default AddressBox

const styles = StyleSheet.create({
    Container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.InputBox,
        borderRadius: 16,
        padding: 16,
        marginVertical: 8,
    },
    LeftIconContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    ContentContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    Title: {
        fontFamily: Fonts.senMedium,
        fontSize: fontsSize.sm,
        color: Colors.black,
        textTransform: 'uppercase',
        marginBottom: 4,
    },
    AddressText: {
        fontFamily: Fonts.senRegular,
        fontSize: fontsSize.exsm,
        color: Colors.lightGrey,
        lineHeight: 18,
    },
    ActionsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginLeft: 12,
    },
    ActionButton: {
        padding: 4,
    }
})