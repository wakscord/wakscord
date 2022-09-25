import { useEffect, useState } from "react";

import Message from "./components/discord/Message";

import { IMessage } from "./types";

export default function App() {
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    (async () => {
      const response = await fetch(
        "https://api.isedol-cctv.xyz/messages/viichan"
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
          width: "500px",
          height: "500px",
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
