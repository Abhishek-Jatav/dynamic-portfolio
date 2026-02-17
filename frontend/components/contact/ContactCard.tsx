import { Contact } from "@/lib/types/contact";
import { Copy, Mail, Trash2, CheckCircle } from "lucide-react";
import StatusBadge from "./StatusBadge";
import ActionButton from "./ActionButton";

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
    <div className="border border-gray-800 bg-black p-4 sm:p-5 rounded-2xl space-y-4 shadow-md">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
        <div className="space-y-2">
          <p className="text-white font-semibold text-base sm:text-lg">
            {contact.name}
          </p>

          {/* Email */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <p className="text-gray-400 text-sm break-all">{contact.email}</p>

            {/* Copy Email (Unread only) */}
            {!contact.isRead && (
              <button
                onClick={() => onCopy(contact.email)}
                className="flex items-center gap-1 text-xs px-2 py-1 rounded-md border border-gray-700 bg-gray-900 text-white hover:bg-gray-800 transition w-fit">
                <Copy size={12} />
                Copy Mail
              </button>
            )}
          </div>
        </div>

        <StatusBadge isRead={contact.isRead} />
      </div>

      {/* Phone */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
        <p className="text-sm text-gray-200 break-all">
          <span className="font-semibold text-white">Phone:</span>{" "}
          {contact.phone || "N/A"}
        </p>

        {/* Copy Phone (Unread only) */}
        {!contact.isRead && contact.phone && (
          <button
            onClick={() => onCopy(contact.phone)}
            className="flex items-center gap-1 text-xs px-2 py-1 rounded-md border border-gray-700 bg-gray-900 text-white hover:bg-gray-800 transition w-fit">
            <Copy size={12} />
            Copy Phone
          </button>
        )}
      </div>

      {/* Message */}
      <div>
        <p className="text-sm font-semibold text-white">Message:</p>
        <p className="text-sm text-gray-300 whitespace-pre-line break-words">
          {contact.message}
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
        {!contact.isRead && (
          <>
            <ActionButton
              variant="green"
              onClick={() => onReadyToMail(contact)}>
              <Mail size={16} />
              Reply
            </ActionButton>

            <ActionButton
              variant="blue"
              onClick={() => onMarkRead(contact._id)}>
              <CheckCircle size={16} />
              Mark Read
            </ActionButton>
          </>
        )}

        {contact.isRead && (
          <ActionButton variant="red" onClick={() => onDelete(contact._id)}>
            <Trash2 size={16} />
            Delete
          </ActionButton>
        )}
      </div>
    </div>
  );
}
