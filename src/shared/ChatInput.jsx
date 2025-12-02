import React, { useState } from "react";

export default function ChatInput({ onSend, loading }) {
  const [text, setText] = useState("");

  function submit(e) {
    e.preventDefault();
    if (!text.trim()) return;
    onSend(text.trim());
    setText("");
  }

  return (
    <form onSubmit={submit} className="mt-4 flex gap-2">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={2}
        className="flex-1 border p-2 rounded"
        placeholder="Ketik pesan..."
      />

      <button
        disabled={loading}
        className="px-4 py-2 rounded bg-indigo-600 text-white"
      >
        {loading ? "..." : "Kirim"}
      </button>
    </form>
  );
}