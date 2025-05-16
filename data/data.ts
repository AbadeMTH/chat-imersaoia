import { Message } from "../types/Message";

export const messages: Message[] = [];

export function generatesIdMessage() {
    return messages.length + 1;
}
