import { useEffect, useState } from "react";

import Message from "./components/discord/Message";

import { IMessage } from "./types";

export default function App() {
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    (async () => {
      const response = await fetch(
        "https://api.isedol-cctv.xyz/messages/viichan?before=10000"
      );
      const messages = await response.json();
      setMessages(messages);
    })();
  }, []);

  return (
    <div className="App">
      <div
        style={{
          background: "#36393f",
          // width: "500px",
          height: "100vh",
          overflowY: "scroll",
        }}
      >
        {messages.map((message, idx) => (
          <Message message={message} before={messages[idx - 1]} key={idx} />
        ))}
      </div>
    </div>
  );
}
