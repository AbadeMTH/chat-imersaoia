import React from "react";
import { Message } from "../../types/Message";
import {
    Linking,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
export function MessageBox(props: Message) {
    return (
        <View
            style={[
                styles.container,
                props.user ? styles.alignRight : styles.alignLeft,
            ]}
        >
            {props.user ? (
                <View style={styles.boxMessageUser}>
                    <Text style={styles.boxTextUser}>{props.text}</Text>
                </View>
            ) : (
                <>
                    {props.link ? (
                        <View style={styles.boxMessageChat}>
                            <TouchableOpacity
                                onPress={() =>
                                    Linking.openURL(
                                        "https://grupopbe.fernandalandeiro.com.br/clinica/"
                                    )
                                }
                            >
                                <Text
                                    style={[
                                        styles.boxTextChat,
                                        { color: "#538f8f" },
                                    ]}
                                >
                                    {props.text}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View style={styles.boxMessageChat}>
                            <Text style={styles.boxTextChat}>{props.text}</Text>
                        </View>
                    )}
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        paddingHorizontal: 20,
        marginVertical: 7,
        flexDirection: "row",
    },
    alignRight: {
        justifyContent: "flex-end",
    },
    alignLeft: {
        justifyContent: "flex-start",
    },
    boxMessageUser: {
        borderTopEndRadius: 0,
        borderRadius: 10,
        padding: 10,
        maxWidth: "80%",
        backgroundColor: "#538f8f",
        elevation: 6,
    },
    boxTextUser: {
        fontSize: 16,
        color: "#FFFFFF",
    },
    boxMessageChat: {
        borderTopStartRadius: 0,
        borderRadius: 10,
        padding: 10,

        maxWidth: "80%",
        backgroundColor: "#f0f0e0",
        elevation: 3,
    },
    boxTextChat: {
        fontSize: 16,
        color: "#000000",
    },
});
