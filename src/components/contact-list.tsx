import { Contact, ContactData } from "./contact";

interface ContactListProps {
  contacts: ContactData[];
  onDeleteRequest: (id: string) => void;
  onEditRequest: (id: string) => void;
}

export function ContactList({ contacts, onEditRequest, onDeleteRequest }: ContactListProps) {
  return (
    <ul className="w-full flex flex-col items-center gap-1">
      {contacts.map((c) => (
        <Contact
          id={c.id}
          key={c.id}
          name={c.name}
          email={c.email}
          phoneNumber={c.phone_number}
          onEditRequest={onEditRequest}
          onDeleteRequest={onDeleteRequest}
        />
      ))}
    </ul>
  );
}
