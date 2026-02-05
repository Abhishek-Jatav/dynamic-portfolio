"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../lib/context/AuthContext";
import { getAllContacts } from "../../lib/api/contact/get-all";
import { markContactRead } from "../../lib/api/contact/mark-read";
import { deleteContact } from "../../lib/api/contact/delete";
import { Contact } from "../../lib/types/contact";
import { ContactSection } from "./ContactSection";

export function ContactList() {
  const { admin } = useAuth();
  const [contacts, setContacts] = useState<Contact[]>([]);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    if (!token) return;
    getAllContacts(token).then(setContacts);
  }, [token]);

  const unread = contacts.filter((c) => !c.isRead);
  const read = contacts.filter((c) => c.isRead);

  const refresh = async () => {
    if (!token) return;
    setContacts(await getAllContacts(token));
  };

  if (!admin) return null;

  return (
    <div className="space-y-6">
      <ContactSection
        title="Unread"
        contacts={unread}
        onRead={async (id) => {
          await markContactRead(id, token!);
          refresh();
        }}
        onDelete={async (id) => {
          await deleteContact(id, token!);
          refresh();
        }}
      />

      <ContactSection
        title="Read"
        contacts={read}
        onDelete={async (id) => {
          await deleteContact(id, token!);
          refresh();
        }}
      />
    </div>
  );
}
