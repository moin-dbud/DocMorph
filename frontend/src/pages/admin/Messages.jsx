import { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";

const API_BASE = import.meta.env.VITE_API_BASE_URL.replace(/\/$/, "");

export default function Messages() {
  const { getToken } = useAuth();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const loadMessages = async () => {
      const token = await getToken();
      const res = await fetch(`${API_BASE}/api/admin/messages`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setMessages(data.messages || []);
    };

    loadMessages();
  }, [getToken]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Contact Messages</h1>

      {messages.length === 0 && (
        <p className="text-zinc-400">No messages yet</p>
      )}

      {messages.map((msg) => (
        <div
          key={msg._id}
          className="rounded-xl bg-white/5 p-4 border border-white/10"
        >
          <div className="flex justify-between text-sm">
            <p className="font-medium">{msg.name}</p>
            <p className="text-zinc-400">
              {new Date(msg.createdAt).toLocaleString()}
            </p>
          </div>

          <p className="text-sm text-zinc-400">{msg.email}</p>
          <p className="mt-2 font-medium">{msg.subject}</p>
          <p className="mt-2 text-sm">{msg.message}</p>
        </div>
      ))}
    </div>
  );
}
