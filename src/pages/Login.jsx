import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const nav = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [apiKey, setApiKey] = useState(
    localStorage.getItem("DEEPSEEK_API_KEY") || ""
  );

  function handleLogin(e) {
    e.preventDefault();
    if (username === "admin" && password === "password123") {
      localStorage.setItem(
        "chat_user",
        JSON.stringify({ username: "admin", role: "admin" })
      );
      if (apiKey) localStorage.setItem("DEEPSEEK_API_KEY", apiKey);
      nav("/chat");
    } else {
      alert("Login gagal. Default: admin / password123");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-6">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white/5 backdrop-blur rounded-2xl p-8 shadow-lg text-white"
      >
        <h1 className="text-2xl font-semibold mb-1">DeepSeek Chat — Login</h1>

        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="w-full p-3 rounded bg-white/10 mb-3"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-3 rounded bg-white/10 mb-3"
        />

        <label className="text-xs text-slate-300">DeepSeek API Key</label>
        <input
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="sk-..."
          className="w-full p-3 rounded bg-white/10 mb-4"
        />

        <button className="px-4 py-2 w-full rounded bg-indigo-600">
          Login
        </button>
      </form>
    </div>
  );
}