"use client";

import { Contact } from "@/lib/types/contact";
import { Copy, Mail, Trash2, CheckCircle } from "lucide-react";
import StatusBadge from "./StatusBadge";
import ActionButton from "./ActionButton";
import toast from "react-hot-toast";

export default function ContactCard({
  contact,
  onCopy,
  onDelete,
  onMarkRead,
  onReadyToMail,
}: {
  contact: Contact;
  onCopy: (value: string) => void;
  onDelete: (id: string) => void;
  onMarkRead: (id: string) => void;
  onReadyToMail: (contact: Contact) => void;
}) {
  return (
    <div className="relative overflow-hidden rounded-3xl p-[1px] bg-gradient-to-br from-indigo-500/30 via-purple-500/20 to-blue-500/30 shadow-[0_20px_60px_rgba(0,0,0,0.6)] transition-all duration-500 hover:scale-[1.01] hover:shadow-[0_30px_80px_rgba(0,0,0,0.8)]">
      <div className="rounded-3xl bg-neutral-950/90 backdrop-blur-2xl border border-white/10 p-5 sm:p-6 space-y-5">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          <div className="space-y-2">
            <p className="text-white font-semibold text-lg tracking-tight">
              {contact.name}
            </p>

            {/* Email */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <p className="text-gray-400 text-sm break-all">{contact.email}</p>

              {!contact.isRead && (
                <button
                  onClick={() => {
                    onCopy(contact.email);
                    toast.success("Email copied to clipboard");
                  }}
                  className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-all">
                  <Copy size={13} />
                  Copy Email
                </button>
              )}
            </div>
          </div>

          <StatusBadge isRead={contact.isRead} />
        </div>

        {/* Phone */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
          <p className="text-sm text-gray-300 break-all">
            <span className="font-semibold text-white">Phone:</span>{" "}
            {contact.phone || "N/A"}
          </p>

          {!contact.isRead && contact.phone && (
            <button
              onClick={() => {
                onCopy(contact.phone!);
                toast.success("Phone copied to clipboard");
              }}
              className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-all">
              <Copy size={13} />
              Copy Phone
            </button>
          )}
        </div>

        {/* Message */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <p className="text-sm font-semibold text-white mb-1">Message:</p>
          <p className="text-sm text-gray-300 whitespace-pre-line break-words leading-relaxed">
            {contact.message}
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          {!contact.isRead && (
            <>
              <ActionButton
                variant="green"
                onClick={() => {
                  onReadyToMail(contact);
                  toast.success("Opening reply...");
                }}>
                <Mail size={16} />
                Reply
              </ActionButton>

              <ActionButton
                variant="blue"
                onClick={() => {
                  onMarkRead(contact._id);
                  toast.success("Marked as read");
                }}>
                <CheckCircle size={16} />
                Mark Read
              </ActionButton>
            </>
          )}

          {contact.isRead && (
            <ActionButton
              variant="red"
              onClick={() => {
                onDelete(contact._id);
                toast.success("Message deleted");
              }}>
              <Trash2 size={16} />
              Delete
            </ActionButton>
          )}
        </div>
      </div>
    </div>
  );
}
