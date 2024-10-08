import { X } from "@phosphor-icons/react";
import * as Dialog from "@radix-ui/react-dialog";
import { FormEvent, useActionState, useEffect } from "react";
import { Button } from "./button";
import { ContactData } from "./contact";
import { editContactAction } from "@/actions/edit-contact-action";
import { useDashboard } from "@/hooks/use-dashboard";

interface CreateContactModalProps {
  open: boolean;
  contact: ContactData;
  onClose: () => void;
}

export function EditContactModal({ open, contact, onClose }: CreateContactModalProps) {
  const { pageIndex, updatePageIndex } = useDashboard();
  const [state, action, pending] = useActionState(editContactAction, { message: "" });

  useEffect(() => {
    if (state.message == "Contact successfully updated.") {
      updatePageIndex(pageIndex);
      onClose();
    }
  }, [state]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    action(new FormData(e.currentTarget));
  }

  return (
    <Dialog.Root open={open}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/35 fixed inset-0 w-screen h-screen" />

        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[500px] p-4 rounded-md bg-zinc-900 text-zinc-100 flex flex-col items-start gap-4 shadow-lg focus:outline-none">
          <header className="flex w-full justify-between items-center">
            <Dialog.Title className="font-medium text-lg">Edit contact</Dialog.Title>

            <Dialog.Description asChild>
              <p className="sr-only">
                Edit the information you need, and click save when finished.
              </p>
            </Dialog.Description>

            <Dialog.Close>
              <button name="Close" onClick={onClose} disabled={pending}>
                <X className="size-4 fill-zinc-100" />
              </button>
            </Dialog.Close>
          </header>

          <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-4">
            <input
              type="hidden"
              name="contact-id"
              value={contact.id}
              className="sr-only"
              readOnly
            />

            <label htmlFor="name" className="sr-only">
              Contact name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              defaultValue={contact.name}
              required
              className="bg-transparent text-lg placeholder:zinc-400 flex-1 outline-none w-full"
            />

            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              defaultValue={contact.email}
              className="bg-transparent text-lg placeholder:zinc-400 flex-1 outline-none w-full"
            />

            <label htmlFor="phone" className="sr-only">
              Contact phone number
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              placeholder="Phone number"
              defaultValue={contact.phone_number}
              required
              className="bg-transparent text-lg placeholder:zinc-400 flex-1 outline-none w-full"
            />

            <div className="w-full flex items-center justify-between">
              <Dialog.Close asChild>
                <Button type="button" onClick={onClose} disabled={pending}>
                  Cancel
                </Button>
              </Dialog.Close>

              <Button type="submit" disabled={pending}>
                Save
              </Button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
