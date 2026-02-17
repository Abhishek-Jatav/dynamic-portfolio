"use client";

import { useEffect, useMemo, useState } from "react";
import { getAllContacts } from "@/lib/api/contact/getAllContacts";
import { markAsRead } from "@/lib/api/contact/markAsRead";
import { deleteContact } from "@/lib/api/contact/deleteContact";
import { Contact } from "../../lib/types/contact";

type TabType = "all" | "read" | "unread";

export default function AdminContactList({ token }: { token: string }) {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [tab, setTab] = useState<TabType>("all");
  const [loading, setLoading] = useState(false);

  async function loadContacts() {
    try {
      setLoading(true);
      const data = await getAllContacts(token);
      setContacts(data);
    } catch (err) {
      console.error("Failed to load contacts:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadContacts();
  }, []);

  // Split contacts
  const unreadContacts = useMemo(
    () => contacts.filter((c) => !c.isRead),
    [contacts],
  );

  const readContacts = useMemo(
    () => contacts.filter((c) => c.isRead),
    [contacts],
  );

  const visibleContacts = useMemo(() => {
    if (tab === "read") return readContacts;
    if (tab === "unread") return unreadContacts;
    return contacts;
  }, [tab, contacts, readContacts, unreadContacts]);

  async function handleMarkRead(id: string) {
    try {
      await markAsRead(id, token);
      loadContacts();
    } catch (err) {
      console.error("Failed to mark as read:", err);
    }
  }

  async function handleDelete(id: string) {
    const ok = confirm("Are you sure you want to delete this contact?");
    if (!ok) return;

    try {
      await deleteContact(id, token);
      loadContacts();
    } catch (err) {
      console.error("Failed to delete contact:", err);
    }
  }

  async function handleCopy(phone: string) {
    try {
      await navigator.clipboard.writeText(phone);
      alert("Phone copied!");
    } catch (err) {
      console.error(err);
      alert("Failed to copy phone number.");
    }
  }

  function handleReadyToMail(contact: Contact) {
    const subject = encodeURIComponent("Reply to your message");
    const body = encodeURIComponent(
      `Hi ${contact.name},\n\nThanks for reaching out!\n\nRegards,\nAdmin`,
    );

    window.open(`mailto:${contact.email}?subject=${subject}&body=${body}`);
  }

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex gap-3">
        <button
          onClick={() => setTab("all")}
          className={`px-4 py-2 rounded-md border text-sm ${
            tab === "all" ? "bg-black text-white" : "bg-white"
          }`}>
          All ({contacts.length})
        </button>

        <button
          onClick={() => setTab("unread")}
          className={`px-4 py-2 rounded-md border text-sm ${
            tab === "unread" ? "bg-black text-white" : "bg-red-50"
          }`}>
          Unread ({unreadContacts.length})
        </button>

        <button
          onClick={() => setTab("read")}
          className={`px-4 py-2 rounded-md border text-sm ${
            tab === "read" ? "bg-black text-white" : "bg-red-50"
          }`}>
          Read ({readContacts.length})
        </button>
      </div>

      {/* Loading */}
      {loading && <p className="text-sm text-gray-500">Loading contacts...</p>}

      {/* Empty */}
      {!loading && visibleContacts.length === 0 && (
        <p className="text-sm text-gray-500">No contacts found.</p>
      )}

      {/* List */}
      <div className="space-y-4">
        {visibleContacts.map((contact) => (
          <div
            key={contact._id}
            className="border p-4 rounded-xl shadow-sm space-y-3">
            {/* Top */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-semibold text-lg">{contact.name}</p>
                <p className="text-sm text-gray-600">{contact.email}</p>
              </div>

              <span
                className={`text-xs px-3 py-1 rounded-full border ${
                  contact.isRead
                    ? "bg-green-50 text-green-700 border-green-200"
                    : "bg-yellow-50 text-yellow-700 border-yellow-200"
                }`}>
                {contact.isRead ? "Read" : "Unread"}
              </span>
            </div>

            {/* Phone with Copy */}
            <div className="flex items-center gap-3">
              <p className="text-sm">
                <span className="font-semibold">Phone:</span> {contact.phone}
              </p>

              {contact.phone && (
                <button
                  onClick={() => handleCopy(contact.phone)}
                  className="text-xs px-3 py-1 rounded-md border bg-gray-50 hover:bg-gray-100">
                  Copy
                </button>
              )}
            </div>

            {/* Message */}
            <div>
              <p className="text-sm font-semibold">Message:</p>
              <p className="text-sm text-gray-700 whitespace-pre-line">
                {contact.message}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3 pt-2">
              {/* UNREAD ACTIONS */}
              {!contact.isRead && (
                <>
                  <button
                    onClick={() => handleMarkRead(contact._id)}
                    className="text-sm px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700">
                    Mark as Read
                  </button>

                  <button
                    onClick={() => handleDelete(contact._id)}
                    className="text-sm px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700">
                    Delete
                  </button>
                </>
              )}

              {/* READ ACTIONS */}
              {contact.isRead && (
                <button
                  onClick={() => handleReadyToMail(contact)}
                  className="text-sm px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700">
                  Ready to Mail
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
