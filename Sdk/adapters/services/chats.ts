import {IChats} from "../../ports/services";
import {
    DeleteAllMessageParams,
    DeleteMessageParams,
    DeleteMessagesOfUserParams,
    EditMessageParams,
    GetConversationMembersParams,
    GetConversationMessagesParams,
    GetSubscribedConversationsParams, MessageInput,
    MessageType,
    SendParams,
    SubscribeParams,
    UnsubscribeParams
} from "./requests/chat";
import DynamicPixels from "../../DynamicPixels";
import axios from "axios";
import {Chat, ChatMember, Message} from "../../dto/chat";
import { Packet } from "../../transport/socket/wss/wss";

export class Payload {
    public targetId: number = 0;
    public subTargetId: number = 0;
    public messageId: number = 0;
    public message: MessageInput = new Message();
    public value: string = "";
    public skip: number = 0;
    public limit: number = 0;
    public properties: Map<string,string> = new Map<string, string>();
    public constructor(init?:Partial<Payload>) {
        Object.assign(this, init);
    }
}

export class Chats implements IChats{
    Send<T extends SendParams>(input: T): void {
        input.message.receiver = input.targetId;

        DynamicPixels.socket.Send(new Packet({
            protocol: "wss",
            method: input.messageType === MessageType.Private ? "chat:send" : "chat:group:send",
            payload: JSON.stringify(new Payload({
                message: input.message,
                targetId: input.targetId,
            }))
        }));
    }

    Subscribe<T extends SubscribeParams>(input: T): void {
        DynamicPixels.socket.Send(new Packet({
            protocol: "wss",
            method: "chat:subscribe",
            payload: JSON.stringify(new Payload({
                targetId: input.conversationId || 0,
                value: input.conversationName
            }))
        }));
    }

    Unsubscribe<T extends UnsubscribeParams>(input: T): void {
        DynamicPixels.socket.Send(new Packet({
            protocol: "wss",
            method: "chat:unsubscribe",
            payload: JSON.stringify(new Payload({
                targetId: input.conversationId,
            }))
        }));
    }

    DeleteMessage<T extends DeleteMessageParams>(input: T): void {
        DynamicPixels.socket.Send(new Packet({
            protocol: "wss",
            method: "chat:message:delete",
            payload: JSON.stringify(new Payload({
                targetId: input.conversationId,
                messageId: input.messageId
            }))
        }));
    }

    DeleteMessagesOfUser<T extends DeleteMessagesOfUserParams>(input: T): void {
        DynamicPixels.socket.Send(new Packet({
            protocol: "wss",
            method: "chat:group:delete",
            payload: JSON.stringify(new Payload({
                targetId: input.conversationId,
                subTargetId: input.targetUserId
            }))
        }));
    }

    EditMessage<T extends EditMessageParams>(input: T): void {
        DynamicPixels.socket.Send(new Packet({
            protocol: "wss",
            method: "chat:message:edit",
            payload: JSON.stringify(new Payload({
                targetId: input.conversationId,
                messageId: input.messageId,
                message: input.message
            }))
        }));
    }

    async GetConversationMembers<T extends GetConversationMembersParams>(input: T): Promise<ChatMember[]> {
        try {
            let {data} = await axios.get(
                `${DynamicPixels._gameApiEndpoint}/api/table/services/chats/${input.conversationId}/member?skip=${input.skip}&limit=${input.limit}`,
                {
                    headers:{
                        "Authorization": `bearer ${DynamicPixels.token}`
                    }
                });

            return data.list;
        } catch (e: any) {
            if(e.response)
                throw new Error(e.response?.data)
            else
                throw new Error(e)
        }
    }

    async GetConversationMessages<T extends GetConversationMessagesParams>(input: T): Promise<Message[]> {
        try {
            let {data} = await axios.get(
                `${DynamicPixels._gameApiEndpoint}/api/table/services/chats/${input.conversationId}?skip=${input.skip}&limit=${input.limit}`,
                {
                    headers:{
                        "Authorization": `bearer ${DynamicPixels.token}`
                    }
                });

            return data.list;
        } catch (e: any) {
            if(e.response)
                throw new Error(e.response.data)
            else
                throw new Error(e)
        }
    }

    async GetSubscribedConversations<T extends GetSubscribedConversationsParams>(input: T): Promise<Chat[]> {
        try {
            let {data} = await axios.get(
                `${DynamicPixels._gameApiEndpoint}/api/table/services/chats?skip=${input.skip}&limit=${input.limit}`,
                {
                    headers:{
                        "Authorization": `bearer ${DynamicPixels.token}`
                    }
                });

            return data.list;
        } catch (e: any) {
            if(e.response)
                throw new Error(e.response.data)
            else
                throw new Error(e)
        }
    }
}