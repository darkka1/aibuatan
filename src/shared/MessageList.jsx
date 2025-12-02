import React from "react";

export default function MessageList({ messages }) {
  return (
    <div>
      {messages.map((m) => (
        <div
          key={m.id}
          className={`my-2 flex ${
            m.role === "user" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`p-3 rounded-xl max-w-[70%] ${
              m.role === "user"
                ? "bg-indigo-600 text-white"
                : "bg-slate-200 text-slate-800"
            }`}
          >
            {m.text}
          </div>
        </div>
      ))}
    </div>
  );
}