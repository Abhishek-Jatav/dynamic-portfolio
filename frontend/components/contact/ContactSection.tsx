import { Contact } from "../../lib/types/contact";
import { ContactItem } from "./ContactItem";

type Props = {
  title: string;
  contacts: Contact[];
  onRead?: (id: string) => void;
  onDelete: (id: string) => void;
};

export function ContactSection({ title, contacts, onRead, onDelete }: Props) {
  if (!contacts.length) return null;

  return (
    <div>
      <h2 className="text-xl mb-2">{title}</h2>
      <div className="space-y-2">
        {contacts.map((c) => (
          <ContactItem
            key={c._id}
            contact={c}
            onRead={onRead ? () => onRead(c._id) : undefined}
            onDelete={() => onDelete(c._id)}
          />
        ))}
      </div>
    </div>
  );
}
