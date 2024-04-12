import {useEffect, useState} from "react";
import styles from "../../../styles/Chat.module.css";
import DynamicPixels from "../../../sdk/DynamicPixels";
import {useRouter} from "next/router";
import {Chat, ChatMember, Message} from "../../../sdk/dto/chat";
import {MessageInput, MessageType} from "../../../sdk/adapters/services/requests/chat";

class Chats {
  public id: number = 0;
  public text: string = "";
  public outgoing: boolean = true;
}

function ChatPage() {
  const router = useRouter();

  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<Chat>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [members, setMembers] = useState<ChatMember[]>([]);

  useEffect(() => {
    (async () => {
      if (localStorage.getItem("token") == null)
        router.push("/");
      else if (DynamicPixels.token == "")
        await DynamicPixels.Auth.LoginWithToken({
          token: localStorage.getItem("token") || ""
        })

      await getSubscribedChats()
    })()
  }, [router])

  const onType = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      DynamicPixels.Services.Chats.Send({
        targetId: selectedChat?.id || 0,
        message: new MessageInput({
          text: e.currentTarget.value,
        }),
        messageType: MessageType.Group
      });
    }
  };

  async function getSubscribedChats() {
    let chats = await DynamicPixels.Services.Chats.GetSubscribedConversations({
      skip: 0,
      limit: 25
    });

    setChats(chats);
  }

  async function Subscribe(e: any) {
    e.preventDefault();
    const {conversation_id, conversation_name} = Object.fromEntries(
        new FormData(e.target).entries()
    );

    await DynamicPixels.Services.Chats.Subscribe({
      conversationId: parseInt(conversation_id as string),
      conversationName: conversation_name as string
    });
  }

  async function selectConversation(chat: Chat) {
    setSelectedChat(chat);

    let messages = await DynamicPixels.Services.Chats.GetConversationMessages({
      conversationId: chat.id,
      skip: 0,
      limit: 50
    });
    setMessages(messages);

    let members = await DynamicPixels.Services.Chats.GetConversationMembers({
      conversationId: chat.id, limit: 50, skip: 0
    });
    setMembers(members);
  }

  async function deleteConversation(chatId: number) {
    DynamicPixels.Services.Chats.Unsubscribe({
      conversationId: chatId,
    });
  }

  return (
      <>
        <main className="container" style={{marginTop:40}}>
            <div className={styles.center} style={{alignItems: "normal"}}>
              <h1>DynamicPixels</h1>
              <h3>Chats</h3>
            </div>

            <div className="row">
              <div className="col-lg-4">
                <div className="card mb-3">
                  <div className="card-body">
                    <form onSubmit={Subscribe}>
                      <div className="mb-3">
                        <input type="number" className="form-control" name="conversation_id"
                               placeholder="Conversation Id"/>
                      </div>
                      <div className="mb-3">
                        <input type="text" className="form-control" name="conversation_name"
                               placeholder="Conversation Name"/>
                      </div>
                      <div className="mb-3">
                        <button type="submit" className="btn btn-primary mb-3">Submit</button>
                      </div>
                    </form>
                  </div>
                </div>
                {chats.map(chat => <div
                    key={`chat-${chat.id}`}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: 'center',
                      marginBottom: 5,
                      backgroundColor: "white",
                      borderRadius: 5,
                      padding: 5
                    }}>
                  <a href="#!" onClick={() => selectConversation(chat)}>{chat.name}</a>
                  <button onClick={() => deleteConversation(chat.id)} className="btn btn-primary">Leave</button>
                </div>)}
              </div>
              <div className="col-lg-4">
                <div className="card">
                  <div className="card-body">
                    {messages.map((msg) => (
                        <div key={msg.id}
                             className={`${styles.message} ${msg.is_me ? styles.outgoing : styles.incoming}`}
                        >
                          {msg.text}
                        </div>
                    ))}

                    <div className={styles.input}>
                      <input
                          type="text"
                          placeholder="Type your message here!"
                          onKeyDown={onType}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <ul>
                {members.map(member => <li
                    key={`member-${member.id}`}
                   >
                  {member.name}
                </li>)}
                </ul>
              </div>
            </div>
        </main>
      </>
  );
}

export async function getStaticProps() {
  return {
    props: {},
  };
}

export default ChatPage;
