import { Button } from "./button";
import { NotePencil, Trash } from "@phosphor-icons/react";

export interface ContactData {
  id: string;
  name: string;
  email: string;
  phone_number: string;
}

interface ContactProps extends Omit<ContactData, "phone_number"> {
  phoneNumber: string;
  onEditRequest: (id: string) => void;
  onDeleteRequest: (id: string) => void;
}

export function Contact({
  id,
  email,
  name,
  phoneNumber,
  onEditRequest,
  onDeleteRequest,
}: ContactProps) {
  return (
    <li className="w-full grid items-center grid-cols-3 md:grid-cols-4 bg-zinc-900 rounded-md py-2 px-4 shadow-lg">
      <span className="text-zinc-100/50 text-xs md:text-sm text-center">{name}</span>

      <span className="text-zinc-100/50 text-xs md:text-sm sr-only md:not-sr-only text-center">
        {email}
      </span>

      <span className="text-zinc-100/50 text-xs md:text-sm text-center">{phoneNumber}</span>

      <div className="flex items-center justify-center gap-1">
        <Button name="Edit contact" variant="secondary" onClick={() => onEditRequest(id)}>
          <NotePencil className="size-4 fill-zinc-100" />
        </Button>

        <Button name="Delete contact" variant="secondary" onClick={() => onDeleteRequest(id)}>
          <Trash className="size-4 fill-zinc-100" />
        </Button>
      </div>
    </li>
  );
}
