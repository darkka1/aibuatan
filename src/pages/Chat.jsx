import React, { useEffect, useState, useRef } from "react";
import Header from "../shared/Header";
import MessageList from "../shared/MessageList";
import ChatInput from "../shared/ChatInput";
import { callDeepSeek } from "../utils/deepseek";

export default function Chat() {
  const [messages, setMessages] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("chat_history") || "[]");
    } catch {
      return [];
    }
  });
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef();

  useEffect(() => {
    localStorage.setItem("chat_history", JSON.stringify(messages));
    if (scrollRef.current)
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  async function onSend(text) {
    if (!text) return;

    const userMsg = { id: Date.now() + "u", role: "user", text };
    setMessages((prev) => [...prev, userMsg]);

    setLoading(true);
    try {
      const aiTemp = { id: Date.now() + "a", role: "assistant", text: "..." };
      setMessages((prev) => [...prev, aiTemp]);

      const res = await callDeepSeek(text);
      const reply =
        res.output || res.text || res?.choices?.[0]?.text || "No reply";

      setMessages((prev) =>
        prev.map((m) => (m.id === aiTemp.id ? { ...m, text: reply } : m))
      );
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + "e",
          role: "assistant",
          text: "Error: " + err.message,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    localStorage.removeItem("chat_user");
    window.location.href = "/login";
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <Header onLogout={handleLogout} />

      <div className="max-w-4xl mx-auto mt-6 p-4 bg-white rounded-xl shadow">
        <div
          ref={scrollRef}
          className="h-[60vh] overflow-y-auto border rounded p-3"
        >
          <MessageList messages={messages} />
        </div>

        <ChatInput onSend={onSend} loading={loading} />
      </div>
    </div>
  );
}