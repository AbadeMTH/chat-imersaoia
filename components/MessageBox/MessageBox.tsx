import React from "react";
import { Message } from "../../types/Message";
import { StyleSheet, Text, View } from "react-native";

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
                <View style={styles.boxMessageChat}>
                    <Text style={styles.boxTextChat}>{props.text}</Text>
                </View>
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
        backgroundColor: "red",
    },
    boxTextUser: {
        fontSize: 16,
        color: "#FFF",
    },
    boxMessageChat: {
        borderTopStartRadius: 0,
        borderRadius: 10,
        padding: 10,
        maxWidth: "80%",
        backgroundColor: "blue",
    },
    boxTextChat: {
        fontSize: 16,
        color: "#FFF",
    },
});
