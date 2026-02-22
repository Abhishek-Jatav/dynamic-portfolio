"use client";

import { useEffect, useMemo, useState } from "react";
import { io, Socket } from "socket.io-client";
import { getAllContacts } from "@/lib/api/contact/getAllContacts";
import { markAsRead } from "@/lib/api/contact/markAsRead";
import { deleteContact } from "@/lib/api/contact/deleteContact";
import { Contact } from "@/lib/types/contact";
import { BACKEND_URL } from "@/lib/env";

import ContactTabs from "./ContactTabs";
import ContactCard from "./ContactCard";

type TabType = "all" | "read" | "unread";

export default function AdminContactList({ token }: { token: string }) {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [tab, setTab] = useState<TabType>("all");
  const [loading, setLoading] = useState(false);

  // 🔵 Update App Badge Helper
  function updateAppBadge(count: number) {
    if ("setAppBadge" in navigator) {
      if (count > 0) {
        navigator.setAppBadge(count);
      } else {
        navigator.clearAppBadge();
      }
    }
  }

  async function loadContacts() {
    try {
      setLoading(true);
      const data = await getAllContacts(token);
      setContacts(data);

      // 🔥 Update badge immediately after fetching
      const unreadCount = data.filter((c: Contact) => !c.isRead).length;
      updateAppBadge(unreadCount);
    } catch (err) {
      console.error("Failed to load contacts:", err);
    } finally {
      setLoading(false);
    }
  }

  // Ask browser notification permission
  useEffect(() => {
    Notification.requestPermission();
  }, []);

  // Initial load
  useEffect(() => {
    loadContacts();
  }, []);

  // Socket connection
  useEffect(() => {
    const socket: Socket = io(BACKEND_URL as string);

    socket.on("new-contact", (contact: Contact) => {
      // 🔔 Browser notification
      if (Notification.permission === "granted") {
        new Notification("New Contact Message", {
          body: `${contact.name} sent a message`,
        });
      }

      loadContacts(); // refresh + badge update
    });

    return () => {
      socket.disconnect();
    };
  }, []);

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
    await markAsRead(id, token);
    await loadContacts(); // reload + update badge
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete?")) return;
    await deleteContact(id, token);
    await loadContacts(); // reload + update badge
  }

  function handleCopy(value: string) {
    navigator.clipboard.writeText(value);
    alert("Copied successfully!");
  }

  function handleReadyToMail(contact: Contact) {
    const subject = encodeURIComponent("Reply to your message");
    const body = encodeURIComponent(
      `Hi ${contact.name},\n\nThanks for reaching out!\n\nRegards,\nAdmin`,
    );
    window.open(`mailto:${contact.email}?subject=${subject}&body=${body}`);
  }

  return (
    <div className="space-y-6 px-4 sm:px-6 lg:px-0">
      <ContactTabs
        tab={tab}
        setTab={setTab}
        allCount={contacts.length}
        unreadCount={unreadContacts.length}
        readCount={readContacts.length}
      />

      {loading && <p className="text-gray-400 text-sm">Loading contacts...</p>}

      {!loading && visibleContacts.length === 0 && (
        <p className="text-gray-400 text-sm">No contacts found.</p>
      )}

      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-2">
        {visibleContacts.map((contact) => (
          <ContactCard
            key={contact._id}
            contact={contact}
            onCopy={handleCopy}
            onDelete={handleDelete}
            onMarkRead={handleMarkRead}
            onReadyToMail={handleReadyToMail}
          />
        ))}
      </div>
    </div>
  );
}
