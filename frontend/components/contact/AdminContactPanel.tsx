"use client";

import { useEffect, useState } from "react";
import { Contact } from "../../lib/types/contact";
import {
  fetchAllContacts,
  markContactAsRead,
  deleteContact,
} from "../../lib/api/contact/admin";
import { useAuth } from "../../lib/context/AuthContext";

export default function AdminContactPanel() {
  const { admin } = useAuth();
  const [messages, setMessages] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"unread" | "read">("unread");

  useEffect(() => {
    if (!admin) return;

    fetchAllContacts()
      .then(setMessages)
      .finally(() => setLoading(false));
  }, [admin]);

  const filtered = messages.filter((m) => m.isRead === (tab === "read"));

  const markRead = async (id: string) => {
    await markContactAsRead(id);
    setMessages((prev) =>
      prev.map((m) => (m._id === id ? { ...m, isRead: true } : m)),
    );
  };

  const remove = async (id: string) => {
    await deleteContact(id);
    setMessages((prev) => prev.filter((m) => m._id !== id));
  };

  if (!admin) return <p>Unauthorized</p>;
  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <div className="flex gap-4 mb-4">
        <button onClick={() => setTab("unread")}>Unread</button>
        <button onClick={() => setTab("read")}>Read</button>
      </div>

      {filtered.map((msg) => (
        <div key={msg._id} className="border p-4 mb-3">
          <p className="font-semibold">
            {msg.name} ({msg.email})
          </p>
          <p className="text-sm">{msg.message}</p>

          <div className="flex gap-3 mt-2">
            {!msg.isRead && (
              <button onClick={() => markRead(msg._id)}>Mark as Read</button>
            )}
            <button onClick={() => remove(msg._id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
