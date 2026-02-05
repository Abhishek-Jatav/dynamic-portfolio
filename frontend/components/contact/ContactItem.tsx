import { Contact } from "../../lib/types/contact";

type Props = {
  contact: Contact;
  onRead?: () => void;
  onDelete?: () => void;
};

export function ContactItem({ contact, onRead, onDelete }: Props) {
  return (
    <div className="border p-3 rounded">
      <p className="font-semibold">{contact.name}</p>
      <p className="text-sm">{contact.email}</p>
      <p className="text-sm">{contact.phone}</p>
      <p className="mt-2">{contact.message}</p>

      <div className="flex gap-2 mt-2">
        {!contact.isRead && onRead && (
          <button onClick={onRead}>Mark Read</button>
        )}
        {onDelete && (
          <button onClick={onDelete} className="text-red-500">
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
