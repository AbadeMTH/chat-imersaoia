import React from "react";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";

type EmptyChatProps = {
    closeKeyboard: () => void;
};

export function EmptyChat({ closeKeyboard }: EmptyChatProps) {
    return (
        <TouchableWithoutFeedback onPress={closeKeyboard}>
            <View style={styles.emptyChat}>
                <Text style={styles.emptyChatMessage}>
                    Bem-vindo(a), sou Alumi, sua assistente de cuidado
                    psicológico!
                </Text>
                <Text style={styles.emptyChatSubmessage}>
                    Me diga como está se sentindo e estarei pronta para te
                    ajudar!
                </Text>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    emptyChat: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    emptyChatMessage: {
        fontSize: 20,
        fontWeight: "bold",
        fontStyle: "italic",
        textAlign: "center",
    },
    emptyChatSubmessage: {
        fontSize: 14,
        fontWeight: "bold",
        fontStyle: "italic",
        textAlign: "center",
        color: "gray",
        width: 250,
        marginTop: 15,
        opacity: 1,
    },
});
