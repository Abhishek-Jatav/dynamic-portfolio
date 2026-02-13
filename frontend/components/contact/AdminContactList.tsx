"use client";

import { useEffect, useState } from "react";
import { getAllContacts } from "@/lib/api/contact/getAllContacts";
import { markAsRead } from "@/lib/api/contact/markAsRead";
import { deleteContact } from "@/lib/api/contact/deleteContact";
import { Contact } from "../../lib/types/contact";

type FilterType = "all" | "read" | "unread";

export default function AdminContactList({ token }: { token: string }) {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filter, setFilter] = useState<FilterType>("all");

  async function loadContacts() {
    const data = await getAllContacts(token);
    setContacts(data);
  }

  useEffect(() => {
    loadContacts();
  }, []);

  const filteredContacts = contacts.filter((c) => {
    if (filter === "read") return c.isRead;
    if (filter === "unread") return !c.isRead;
    return true;
  });

  async function handleMarkRead(id: string) {
    await markAsRead(id, token);
    loadContacts();
  }

  async function handleDelete(id: string) {
    await deleteContact(id, token);
    loadContacts();
  }

  return (
    <div className="space-y-6">
      {/* Filter Buttons */}
      <div className="flex gap-4">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("read")}>Read</button>
        <button onClick={() => setFilter("unread")}>Unread</button>
      </div>

      {/* Contact List */}
      {filteredContacts.map((contact) => (
        <div key={contact._id} className="border p-4 rounded shadow space-y-2">
          <p>
            <strong>Name:</strong> {contact.name}
          </p>
          <p>
            <strong>Email:</strong> {contact.email}
          </p>
          <p>
            <strong>Phone:</strong> {contact.phone}
          </p>
          <p>
            <strong>Message:</strong> {contact.message}
          </p>
          <p>
            <strong>Status:</strong> {contact.isRead ? "Read" : "Unread"}
          </p>

          {!contact.isRead && (
            <button
              onClick={() => handleMarkRead(contact._id)}
              className="bg-blue-500 text-white px-3 py-1 mr-2">
              Mark as Read
            </button>
          )}

          <button
            onClick={() => handleDelete(contact._id)}
            className="bg-red-500 text-white px-3 py-1">
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
