import { useEffect, useRef, useState } from "react";
import './Chat.css';

export default function Chat() {
  const [status, setStatus] = useState("Not connected");
  const [paired, setPaired] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [onlineCount, setOnlineCount] = useState(0);

  const wsRef = useRef(null);
  const reconnectTimer = useRef(null);
  const mounted = useRef(true);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    mounted.current = true;
    connect();

    return () => {
      mounted.current = false;
      clearTimeout(reconnectTimer.current);
      wsRef.current?.close();
    };
  }, []);

  function connect() {
    const ws = new WebSocket("ws://localhost:8080/chat");
    wsRef.current = ws;

    ws.onopen = () => setStatus("Connected");

    ws.onclose = () => {
      setStatus("Disconnected");
      setPaired(false);
      if (mounted.current) {
        reconnectTimer.current = setTimeout(connect, 3000);
      }
    };

    ws.onerror = () => setStatus("Error");

    ws.onmessage = (e) => {
      const text = e.data;

      if (text === "PING") {
        ws.send("PONG");
        return;
      }

      if (text.startsWith("ONLINE_COUNT:")) {
        const count = parseInt(text.split(":")[1], 10);
        setOnlineCount(count);
        return;
      }

      if (text === "PAIRED") {
        setPaired(true);
        pushMsg("You are now chatting with a random partner.", "system");
        setStatus("Paired");
        return;
      }
      if (text === "WAITING") {
        setPaired(false);
        setStatus("Waiting in queue…");
        pushMsg("Searching for a partner…", "system");
        return;
      }
      if (text === "PARTNER_LEFT") {
        setPaired(false);
        setStatus("Partner left");
        pushMsg("Partner left. Click Next or Start to find a new one.", "system");
        return;
      }
      if (text.startsWith("SYSTEM:")) {
        pushMsg(text.replace("SYSTEM:", "").trim(), "system");
        return;
      }
      pushMsg(text, "them");
    };
  }

  function pushMsg(text, who) {
    setMessages((prev) => [...prev, { text, who }]);
  }

  function send() {
    const text = input.trim();
    if (!text || !wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;
    wsRef.current.send(text);
    pushMsg(text, "me");
    setInput("");
  }

  function start() {
    setMessages([]); 
    wsRef.current?.send("FIND");
  }
  function nextChat() {
    setMessages([]); 
    wsRef.current?.send("NEXT");
  }
  function endChat() {
    wsRef.current?.send("END");
    setPaired(false);
    setStatus("Chat ended");
    pushMsg("You ended the chat.", "system");
  }

  return (
    <div className="chat-layout">
      <div className="chat-container">
      <header className="chat-header">
        {/* <div>Anon Random Chat</div> */}
        <div className="chat-status">
          {status} {onlineCount > 0 && `• ${onlineCount} online`}
        </div>
      </header>

      <div className="chat-box">
        <div className="chat-messages">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`message ${
                m.who === "me" ? "message-me" :
                m.who === "them" ? "message-them" :
                "message-system"
              }`}
            >
              {m.text}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="chat-input-area">
          <textarea
            className="chat-textarea"
            placeholder={paired ? "Type a message…" : "Click Start to find a partner"}
            disabled={!paired}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
          />
          <button
            className="chat-button"
            onClick={send}
            disabled={!paired}
          >
            Send
          </button>
        </div>

        <div className="chat-controls">
          <button onClick={start} disabled={paired || status === "Waiting in queue…"}>Start</button>
          <button onClick={nextChat} disabled={!paired}>Next</button>
          <button onClick={endChat} disabled={!paired}>End</button>
        </div>

        <div className="chat-footer">
          This MVP stores Nothing.
        </div>
      </div>
      </div>
    </div>
  );
}
