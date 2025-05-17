import {
    FlatList,
    Image,
    Keyboard,
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { response } from "./gemini/api";
import { useCallback, useEffect, useRef, useState } from "react";
import { generatesIdMessage, messages } from "./data/data";
import { Message } from "./types/Message";
import { MessageBox } from "./components/MessageBox/MessageBox";
import { FontAwesome } from "@expo/vector-icons";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function App() {
    const [userMsg, setUserMsg] = useState("");
    const [update, setUpdate] = useState(0);
    const [loading, setLoading] = useState(false);
    const [keyboardHeight, setKeyboardHeight] = useState(0);
    const [disabled, setDisabled] = useState(false);
    const [appIsReady, setAppIsReady] = useState(false);
    const flatlistRef = useRef<FlatList>(null);

    useEffect(() => {
        async function prepare() {
            try {
            } catch (e) {
                console.warn(e);
            } finally {
                // Tell the application to render
                setAppIsReady(true);
            }
        }

        prepare();

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

    const onLayoutRootView = useCallback(() => {
        if (appIsReady) {
            SplashScreen.hide();
        }
    }, [appIsReady]);

    if (!appIsReady) {
        return null;
    }

    async function AdicionaMensagens(msg: string) {
        if (msg.trim().length != 0) {
            setDisabled(true);
            const newMessageUser: Message = {
                id: generatesIdMessage(),
                text: msg,
                user: true,
                link: false,
            };
            messages.push(newMessageUser);
            setTimeout(() => {
                setLoading(true);
            }, 400);
            closeKeyboard();
            setUserMsg("");
            setUpdate((prev) => prev + 1);
            const geminiResponse = await response(msg);
            if (geminiResponse) {
                setLoading(false);
                const newMessageAI: Message = {
                    id: generatesIdMessage(),
                    text: geminiResponse,
                    user: false,
                    link: false,
                };
                messages.push(newMessageAI);
                if (geminiResponse.includes("Grupo PBE")) {
                    const newMessageAILink: Message = {
                        id: generatesIdMessage(),
                        text: "Clique para acessar o Grupo PBE",
                        user: false,
                        link: true,
                    };
                    messages.push(newMessageAILink);
                }
                setUpdate((prev) => prev + 1);
            }
        }
        setDisabled(false);
        setUserMsg("");
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
                {loading ? (
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
                <SafeAreaView
                    style={styles.container}
                    onLayout={onLayoutRootView}
                >
                    {messages.length > 0 ? (
                        <FlatList
                            ref={flatlistRef}
                            data={messages}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={RenderItem}
                            extraData={update}
                            onContentSizeChange={scrollListToBottom}
                            ListFooterComponent={FooterItem}
                        />
                    ) : (
                        <View style={styles.emptyChat}>
                            <Text style={styles.emptyChatMessage}>
                                Bem-vindo(a), sou Alumi, sua assistente de
                                cuidado psicológico!
                            </Text>
                            <Text style={styles.emptyChatSubmessage}>
                                Me diga como está se sentindo e estarei pronta
                                para te ajudar!
                            </Text>
                        </View>
                    )}

                    <View
                        style={[
                            styles.textInputContainer,
                            {
                                marginBottom: keyboardHeight
                                    ? keyboardHeight + 0
                                    : 5,
                            },
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
                            onPress={() => AdicionaMensagens(userMsg)}
                            style={[
                                styles.sendMessageButton,
                                disabled && { backgroundColor: "red" },
                            ]}
                            disabled={disabled}
                        >
                            <FontAwesome
                                name="send-o"
                                size={20}
                                color="#FFFFFF"
                            />
                        </TouchableOpacity>
                    </View>
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
    emptyChat: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
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
    typing: {
        fontSize: 14,
        fontWeight: "bold",
        fontStyle: "italic",
        paddingLeft: 30,
        paddingBottom: 10,
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
