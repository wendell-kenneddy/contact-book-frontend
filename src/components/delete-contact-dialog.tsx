import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { Button } from "./button";
import { X } from "@phosphor-icons/react";
import { FormEvent, useActionState, useEffect } from "react";
import { deleteContactAction } from "@/actions/delete-contact.action";
import { useDashboard } from "@/hooks/use-dashboard";

interface DeleteContactDialogProps {
  open: boolean;
  contactID: string | null;
  onClose: () => void;
}

export function DeleteContactDialog({ open, contactID, onClose }: DeleteContactDialogProps) {
  const { pageIndex, updatePageIndex } = useDashboard();
  const [state, action, pending] = useActionState(deleteContactAction, { message: "" });

  useEffect(() => {
    if (state.message == "Contact successfully deleted.") {
      updatePageIndex(pageIndex);
      onClose();
    }
  }, [state]);

  function handleDelete(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    action(formData);
  }

  return (
    <AlertDialog.Root open={open}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="bg-black/35 fixed inset-0 w-screen h-screen" />

        <AlertDialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[500px] p-4 rounded-md bg-zinc-900 text-zinc-100 flex flex-col items-start gap-4 shadow-lg">
          <header className="w-full flex items-center justify-between">
            <AlertDialog.Title asChild>
              <h2 className="font-bold text-lg">Delete contact</h2>
            </AlertDialog.Title>

            <AlertDialog.Cancel asChild onClick={onClose} disabled={pending}>
              <button name="Close dialog">
                <X className="size-4 fill-zinc-100" />
              </button>
            </AlertDialog.Cancel>
          </header>

          <AlertDialog.Description asChild>
            <p className="text-sm text-left">
              Are you sure you want to delete the selected contact? Once deleted, it will not be
              possible to recover it.
            </p>
          </AlertDialog.Description>

          <form onSubmit={handleDelete} className="w-full flex items-center justify-between">
            <input
              type="text"
              name="contact-id"
              value={String(contactID)}
              hidden
              className="sr-only"
              readOnly
            />

            <AlertDialog.Action asChild disabled={pending}>
              <Button type="submit">Confirm</Button>
            </AlertDialog.Action>

            <Button variant="secondary" onClick={onClose} disabled={pending}>
              Cancel
            </Button>
          </form>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
