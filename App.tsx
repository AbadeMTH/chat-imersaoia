import {
    FlatList,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { response } from "./gemini/api";
import { useRef, useState } from "react";
import { generatesIdMessage, messages } from "./data/data";
import { Message } from "./types/Message";
import { MessageBox } from "./components/MessageBox/MessageBox";
import { FontAwesome } from "@expo/vector-icons";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function App() {
    const [userMsg, setUserMsg] = useState("");
    const [update, setUpdate] = useState(0);
    const flatlistRef = useRef<FlatList>(null);

    async function AdicionaMensagens(msg: string) {
        if (msg.trim().length != 0) {
            const newMessageUser: Message = {
                id: generatesIdMessage(),
                text: msg,
                user: true,
            };
            messages.push(newMessageUser);
            setUserMsg("");
            setUpdate((prev) => prev + 1);
            const geminiResponse = await response(msg);
            if (geminiResponse) {
                const newMessageAI: Message = {
                    id: generatesIdMessage(),
                    text: geminiResponse,
                    user: false,
                };
                messages.push(newMessageAI);
                setUpdate((prev) => prev + 1);
            }
        }
        setUserMsg("");
    }

    function scrollListToBottom() {
        setTimeout(() => {
            flatlistRef.current?.scrollToEnd({ animated: true });
        }, 100);
    }

    function RenderItem({ item }: { item: Message }) {
        return <MessageBox {...item} />;
    }
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "android" ? undefined : "padding"}
            style={{ flex: 1 }}
        >
            <SafeAreaProvider>
                <SafeAreaView style={styles.container}>
                    <FlatList
                        ref={flatlistRef}
                        data={messages}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={RenderItem}
                        extraData={update}
                        onContentSizeChange={scrollListToBottom}
                        style={styles.list}
                    />

                    <View style={styles.textInputContainer}>
                        <TextInput
                            placeholder="Digite aqui..."
                            value={userMsg}
                            onChangeText={(prev) => setUserMsg(prev)}
                            style={styles.textInput}
                        />
                        <TouchableOpacity
                            onPress={() => AdicionaMensagens(userMsg)}
                            style={styles.sendMessageButton}
                        >
                            <FontAwesome name="send-o" size={20} />
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </SafeAreaProvider>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    list: {
        flex: 1,
    },
    textInputContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 15,
        paddingVertical: 5,
    },
    textInput: {
        flex: 1,
        paddingHorizontal: 15,
        borderRadius: 25,
        backgroundColor: "#d9d9d9",
        marginRight: 10,
        fontSize: 16,
    },
    sendMessageButton: {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,
        backgroundColor: "#d9d9d9",
        width: 45,
        height: 45,
    },
});
