import { IChats} from "../../ports/services";
import {
    DeleteAllMessageParams,
    DeleteMessageParams,
    DeleteMessagesOfUserParams, EditMessageParams,
    GetConversationMembersParams,
    GetConversationMessagesParams,
    GetSubscribedConversationsParams, SendParams,
    SubscribeParams,
    UnsubscribeParams
} from "./requests/chat";

export class Chats implements IChats{
    DeleteAllMessage<T extends DeleteAllMessageParams>(): void {
    }

    DeleteMessage<T extends DeleteMessageParams>(): Promise<object> {
        return Promise.resolve({});
    }

    DeleteMessagesOfUser<T extends DeleteMessagesOfUserParams>(): void {
    }

    EditMessage<T extends EditMessageParams>(): Promise<object> {
        return Promise.resolve({});
    }

    GetConversationMembers<T extends GetConversationMembersParams>(): Promise<object[]> {
        return Promise.resolve([]);
    }

    GetConversationMessages<T extends GetConversationMessagesParams>(): Promise<object[]> {
        return Promise.resolve([]);
    }

    GetSubscribedConversations<T extends GetSubscribedConversationsParams>(): Promise<object[]> {
        return Promise.resolve([]);
    }

    Send<T extends SendParams>(): Promise<object> {
        return Promise.resolve({});
    }

    Subscribe<T extends SubscribeParams>(): void {
    }

    Unsubscribe<T extends UnsubscribeParams>(): void {
    }

}