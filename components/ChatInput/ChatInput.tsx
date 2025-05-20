import React, { useEffect, useState } from "react";
import {
    Keyboard,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

type ChatInputProps = {
    AddMessages: (msg: string) => Promise<void>;
    sendButtonDisabled: boolean;
    closeKeyboard: () => void;
};

export function ChatInput({
    AddMessages,
    sendButtonDisabled,
    closeKeyboard,
}: ChatInputProps) {
    const [userMsg, setUserMsg] = useState("");
    const [keyboardHeight, setKeyboardHeight] = useState(0);

    useEffect(() => {
        const showSubscription = Keyboard.addListener(
            "keyboardDidShow",
            (event) => {
                setKeyboardHeight(event.endCoordinates.height);
            }
        );
        const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
            setKeyboardHeight(0);
        });

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    function HandleMessages(userMsg: string) {
        AddMessages(userMsg);
        setUserMsg("");
    }

    return (
        <TouchableWithoutFeedback onPress={closeKeyboard}>
            <View
                style={[
                    styles.textInputContainer,
                    { marginBottom: keyboardHeight },
                ]}
            >
                <TextInput
                    placeholder="Digite aqui..."
                    value={userMsg}
                    onChangeText={(prev) => setUserMsg(prev)}
                    style={styles.textInput}
                    autoCapitalize="sentences"
                    multiline={true}
                    numberOfLines={3}
                />
                <TouchableOpacity
                    onPress={() => HandleMessages(userMsg)}
                    style={[
                        styles.sendMessageButton,
                        sendButtonDisabled && {
                            backgroundColor: "red",
                        },
                    ]}
                    disabled={sendButtonDisabled}
                >
                    <FontAwesome name="send-o" size={20} color="#FFFFFF" />
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    textInputContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 15,
        paddingTop: 10,
    },
    textInput: {
        flex: 1,
        paddingHorizontal: 15,
        borderRadius: 25,
        backgroundColor: "#FFFFFF",
        marginRight: 10,
        fontSize: 16,
        color: "#000000",
        borderWidth: 1,
        borderColor: "#2F4F4F",
    },
    sendMessageButton: {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,
        backgroundColor: "#6db2b2",
        width: 45,
        height: 45,
    },
});
