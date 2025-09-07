// Room.jsx
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import './Chat.css';

export default function Room() {
  const { roomId } = useParams();
  const [status, setStatus] = useState("Not connected");
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
  }, [roomId]);

  function connect() {
    // const ws = new WebSocket(`ws://localhost:8080/room?roomId=${roomId}`);
    const ws = new WebSocket(`wss://anogab-backend.onrender.com/room?roomId=${roomId}`);

    wsRef.current = ws;

    ws.onopen = () => setStatus(`Connected to room ${roomId}`);

    ws.onclose = () => {
      setStatus("Disconnected");
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

      if (text.startsWith("SYSTEM:")) {
        pushMsg(text.replace("SYSTEM:", "").trim(), "system");
        return;
      }

      // ✅ Prevent showing my own message again
      if (text.startsWith("FROM_ME:")) {
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
    pushMsg(text, "me"); // show instantly for sender
    setInput("");
  }

  return (
    <div className="chat-layout">
      <div className="chat-container">
        <header className="chat-header">
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
              placeholder="Type a message…"
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
              disabled={!input.trim()}
            >
              Send
            </button>
          </div>

          <div className="chat-footer">
            Room <b>{roomId}</b> • Messages are not saved.
          </div>
        </div>
      </div>
    </div>
  );
}
