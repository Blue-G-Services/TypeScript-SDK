import { Message } from "../../../dto/chat";

export class MessageInput{
    public receiver: number = 0;
    // public image: string = "";
    public text: string = "";
    public payload: string = "";

    public constructor(init?:Partial<MessageInput>) {
        Object.assign(this, init);
    }
}

export enum MessageType{
    Private = 0,
    Group = 1
}

export class SendParams{
    public message: MessageInput = new MessageInput();
    public messageType: MessageType = 0;
    public targetId: number = 0;
}

export class SubscribeParams{
    public conversationId: number | undefined = 0;
    public conversationName: string | undefined = "";
}

export class UnsubscribeParams{
    public conversationId: number = 0;
}

export class GetSubscribedConversationsParams{
    public skip:number = 0;
    public limit:number = 25;
}

export class GetConversationMessagesParams{
    public conversationId: number = 0;
    public skip:number = 0;
    public limit:number = 25;
}

export class GetConversationMembersParams{
    public conversationId: number = 0;
    public skip:number = 0;
    public limit:number = 25;
}

export class EditMessageParams{
    public conversationId: number = 0;
    public messageId: number = 0;
    public message: Message = new Message();
}

export class DeleteMessageParams{
    public conversationId: number = 0;
    public messageId: number = 0;
}

export class DeleteAllMessageParams{
    public conversationId: number = 0;
}

export class DeleteMessagesOfUserParams{
    public conversationId: number = 0;
    public targetUserId: number = 0;
}
