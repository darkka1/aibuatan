import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Chat from "./pages/Chat";

function isAuthed() {
  try {
    const u = JSON.parse(localStorage.getItem("chat_user"));
    return u && u.role === "admin";
  } catch {
    return false;
  }
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/chat"
        element={isAuthed() ? <Chat /> : <Navigate to="/login" replace />}
      />
      <Route path="/" element={<Navigate to="/chat" replace />} />
    </Routes>
  );
}