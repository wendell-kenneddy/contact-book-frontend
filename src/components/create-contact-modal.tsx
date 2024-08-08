import { X } from "@phosphor-icons/react";
import * as Dialog from "@radix-ui/react-dialog";
import { FormEvent } from "react";
import { Button } from "./button";

interface CreateContactModalProps {
  open: boolean;
  onClose: () => void;
}

export function CreateContactModal({ open, onClose }: CreateContactModalProps) {
  function getFormData(e: FormEvent) {
    const data = new FormData(e.target as HTMLFormElement);
    const name = data.get("name");
    const email = data.get("email");
    const phone = data.get("phone");
    return { name, email, phone };
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const data = getFormData(e);
  }
  return (
    <Dialog.Root open={open}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/35 fixed inset-0 w-screen h-screen" />

        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[500px] p-4 rounded-md bg-zinc-900 text-zinc-100 flex flex-col items-start gap-4 shadow-lg focus:outline-none">
          <header className="flex w-full justify-between items-center">
            <Dialog.Title className="font-medium text-lg">Create contact</Dialog.Title>

            <Dialog.Description asChild>
              <p className="sr-only">
                Fill the required contact information, and click save when finished.
              </p>
            </Dialog.Description>

            <Dialog.Close>
              <button name="Close" onClick={onClose}>
                <X className="size-4 fill-zinc-100" />
              </button>
            </Dialog.Close>
          </header>

          <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-4">
            <label htmlFor="name" className="sr-only">
              Contact name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Name"
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
              required
              className="bg-transparent text-lg placeholder:zinc-400 flex-1 outline-none w-full"
            />

            <div className="w-full flex items-center justify-between">
              <Dialog.Close asChild>
                <Button type="button" onClick={onClose}>
                  Cancel
                </Button>
              </Dialog.Close>

              <Button type="submit">Save</Button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
