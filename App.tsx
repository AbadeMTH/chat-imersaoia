import {
    FlatList,
    Image,
    Keyboard,
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { response } from "./gemini/api";
import { useRef, useState } from "react";
import { generatesIdMessage, messages } from "./data/data";
import { Message } from "./types/Message";
import { MessageBox } from "./components/MessageBox/MessageBox";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { EmptyChat } from "./components/EmptyChat/EmptyChat";
import { ChatInput } from "./components/ChatInput/ChatInput";

export default function App() {
    const [updateList, setUpdateList] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState(false);
    const [sendButtonDisabled, setSendButtonDisabled] = useState(false);
    const flatlistRef = useRef<FlatList>(null);

    function newMessage(
        id: number,
        text: string,
        user: boolean,
        link: boolean
    ) {
        const newMessageToList: Message = {
            id: id,
            text: text,
            user: user,
            link: link,
        };
        messages.push(newMessageToList);
    }

    async function AddMessages(msg: string) {
        if (msg.trim().length != 0) {
            setSendButtonDisabled(true);

            newMessage(generatesIdMessage(), msg, true, false);
            setTimeout(() => {
                setLoadingMessage(true);
            }, 400);

            closeKeyboard();

            setUpdateList(true);

            const geminiResponse = await response(msg);
            if (geminiResponse) {
                setLoadingMessage(false);

                newMessage(generatesIdMessage(), geminiResponse, false, false);

                if (geminiResponse.includes("Grupo PBE")) {
                    newMessage(
                        generatesIdMessage(),
                        "Clique para acessar o Grupo PBE",
                        false,
                        true
                    );
                }

                setUpdateList(false);
            }
        }
        setSendButtonDisabled(false);
    }

    function scrollListToBottom() {
        setTimeout(() => {
            flatlistRef.current?.scrollToEnd({ animated: true });
        }, 100);
    }

    function closeKeyboard() {
        setTimeout(() => {
            Keyboard.dismiss();
        }, 100);
    }

    function RenderItem({ item }: { item: Message }) {
        return (
            <>
                {item.user ? (
                    <MessageBox {...item} />
                ) : (
                    <View style={styles.imageContainer}>
                        <Image
                            source={require("./assets/logo.jpg")}
                            style={styles.image}
                        />
                        <MessageBox {...item} />
                    </View>
                )}
            </>
        );
    }

    function FooterItem() {
        return (
            <>
                {loadingMessage ? (
                    <Text style={styles.typing}>
                        Assistente está digitando...
                    </Text>
                ) : null}
            </>
        );
    }

    return (
        <SafeAreaProvider>
            <KeyboardAvoidingView style={{ flex: 1 }}>
                <SafeAreaView style={styles.container}>
                    {messages.length > 0 ? (
                        <FlatList
                            ref={flatlistRef}
                            data={messages}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={RenderItem}
                            extraData={updateList}
                            onContentSizeChange={scrollListToBottom}
                            ListFooterComponent={FooterItem}
                        />
                    ) : (
                        <EmptyChat closeKeyboard={closeKeyboard} />
                    )}
                    <ChatInput
                        AddMessages={AddMessages}
                        sendButtonDisabled={sendButtonDisabled}
                        closeKeyboard={closeKeyboard}
                    />
                </SafeAreaView>
            </KeyboardAvoidingView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#e7f5e6",
        paddingVertical: 7,
    },
    typing: {
        fontSize: 14,
        fontWeight: "bold",
        fontStyle: "italic",
        paddingLeft: 30,
        paddingBottom: 10,
    },

    imageContainer: {
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-evenly",
    },
    image: {
        width: 30,
        height: 30,
        margin: 10,
        marginRight: -10,
        borderRadius: 30,
        elevation: 3,
    },
});
