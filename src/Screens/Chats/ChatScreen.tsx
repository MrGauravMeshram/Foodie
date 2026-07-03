import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Platform, KeyboardAvoidingView, } from 'react-native'
import React, { useState, useRef } from 'react'
import Entypo from 'react-native-vector-icons/Entypo';
import { Colors } from '../../Theme/Color';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fontsSize, Fonts } from '../../Theme/fonts';

const ChatScreen = () => {
    const [message, setMessage] = useState("");

    const [messages, setMessages] = useState([
        {
            id: "1",
            text: "Hello",
            sender: "other",
        },
    ]);

    const flatListRef = useRef<FlatList>(null);
    const sendMessage = () => {
        if (message.trim() === "") return;

        const newMessage = {
            id: Date.now().toString(),
            text: message,
            sender: "me",
        };

        setMessages(prev => [...prev, newMessage]);
        setMessage("");

        setTimeout(() => {
            flatListRef.current?.scrollToEnd({ animated: true });
        }, 100);
    };
    return (
        <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: Colors.white }}>
            <KeyboardAvoidingView style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 10}>
                <View style={Style.HeaderContainer}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', borderRadius: 50, backgroundColor: "#E5E5E5", padding: 10, height: 50, width: 50, justifyContent: 'center' }}>
                        <Entypo name="cross" color="#000" size={28} />
                    </View>
                    <Text style={Style.name}>Priyanshu</Text>
                </View>
                <View style={Style.messageBox}>
                    <FlatList
                        ref={flatListRef}
                        data={messages}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View
                                style={[
                                    Style.messageContainer,
                                    item.sender === "me"
                                        ? Style.rightMessage
                                        : Style.leftMessage,
                                ]}
                            >
                                <View
                                    style={[
                                        Style.bubble,
                                        item.sender === "me"
                                            ? Style.myBubble
                                            : Style.otherBubble,
                                    ]}
                                >
                                    <Text
                                        style={{
                                            color: item.sender === "me" ? "#fff" : "#000",
                                        }}
                                    >
                                        {item.text}
                                    </Text>
                                </View>
                            </View>
                        )}
                    />
                </View>
                <View style={Style.inputContainer}>
                    <TextInput
                        value={message}
                        onChangeText={setMessage}
                        placeholder="Type a message..."
                        style={Style.input}
                    />

                    <TouchableOpacity onPress={sendMessage}>
                        <Text style={{ color: "#ff7a22", fontWeight: "bold" }}>
                            Send
                        </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default ChatScreen

const Style = StyleSheet.create({
    HeaderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        paddingHorizontal: 16
    },
    name: {
        fontFamily: Fonts.senSemiBold,
        fontSize: fontsSize.large

    },
    messageBox: {
        flex: 1,
        paddingHorizontal: 16,
        marginTop: 16,

    },
    messageContainer: {
        marginVertical: 5,
    },

    leftMessage: {
        alignItems: "flex-start",
    },

    rightMessage: {
        alignItems: "flex-end",
    },

    bubble: {
        maxWidth: "75%",
        padding: 12,
        borderRadius: 15,
    },

    myBubble: {
        backgroundColor: "#ff7a22",
    },

    otherBubble: {
        backgroundColor: "#ECECEC",
    },

    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
        borderTopWidth: 1,
        borderColor: "#eee",
    },

    input: {
        flex: 1,
        backgroundColor: "#F5F5F5",
        borderRadius: 25,
        paddingHorizontal: 15,
        marginRight: 10,
    },
})