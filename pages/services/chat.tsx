import { useState } from "react";
import styles from "../../styles/Chat.module.css";

class Message {
  public id: number = 0;
  public text: string = "";
  public outgoing: boolean = true;
}

function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);

  const onType = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setMessages([
        { id: messages.length, text: e.currentTarget.value, outgoing:false },
        ...messages,
      ]);
    }
  };

  return (
    <>
      <main>
        <div className={styles.center}>
          <div className={styles.card}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`${styles.message} ${msg.outgoing ? styles.outgoing : styles.incoming}`}
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
