import React from "react";

export default function Header({ onLogout }) {
  const user = JSON.parse(localStorage.getItem("chat_user") || "null");

  return (
    <header className="p-4 bg-white shadow flex justify-between">
      <div className="font-bold text-xl">DeepSeek Chat</div>

      <div className="flex items-center gap-3">
        <span className="text-sm">{user?.username}</span>
        <button onClick={onLogout} className="px-3 py-1 rounded bg-slate-200">
          Logout
        </button>
      </div>
    </header>
  );
}