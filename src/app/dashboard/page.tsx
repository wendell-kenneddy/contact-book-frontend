"use client";

import { Button } from "@/components/button";
import { ContactData } from "@/components/contact";
import { ContactList } from "@/components/contact-list";
import { CreateContactModal } from "@/components/create-contact-modal";
import { DeleteContactDialog } from "@/components/delete-contact-dialog";
import { EditContactModal } from "@/components/edit-contact-dialog";
import { contacts } from "@/data/contacts";
import { ArrowLeft, ArrowRight, Plus, X } from "@phosphor-icons/react";
import { useState } from "react";

export default function Dashboard() {
  const [seedContacts, setSeedContacts] = useState<ContactData[]>(contacts);
  const [contactToDeleteID, setContactToDeleteID] = useState<string | null>(null);
  const [contactToEditID, setContactToEditID] = useState<string>("");
  const [isCreateContactModalOpen, setIsCreateContactModalOpen] = useState(false);

  function closeDeleteContactDialog() {
    setContactToDeleteID(null);
  }

  function handleDelete() {
    setSeedContacts((prev) => prev.filter((c) => c.id != contactToDeleteID));
    closeDeleteContactDialog();
  }

  function openCreateContactModal() {
    setIsCreateContactModalOpen(true);
  }

  function closeCreateContactModal() {
    setIsCreateContactModalOpen(false);
  }

  function closeEditContactModal() {
    setContactToEditID("");
  }

  return (
    <main className="flex flex-col items-center gap-6 text-zinc-100 pb-4">
      <div className="flex items-center gap-2">
        <h1 className="text-xl font-medium">Your contacts</h1>

        <Button name="Add contact" variant="secondary" onClick={openCreateContactModal}>
          <Plus className="size-4 fill-teal-400" />
        </Button>
      </div>

      <ContactList
        contacts={seedContacts}
        onEditRequest={(id: string) => setContactToEditID(id)}
        onDeleteRequest={(id: string) => setContactToDeleteID(id)}
      />

      <div className="flex w-full items-center justify-between">
        <Button variant="secondary">
          <ArrowLeft className="size-6 fill-teal-400" fill="bold" />
        </Button>

        <Button variant="secondary">
          <ArrowRight className="size-6 fill-teal-400" fill="bold" />
        </Button>
      </div>

      <DeleteContactDialog
        open={!!contactToDeleteID}
        onClose={closeDeleteContactDialog}
        onDelete={handleDelete}
      />

      {!!contactToEditID && (
        <EditContactModal
          open={true}
          contact={seedContacts.find((c) => c.id == contactToEditID) as ContactData}
          closeModalFunction={closeEditContactModal}
        />
      )}

      <CreateContactModal open={isCreateContactModalOpen} onClose={closeCreateContactModal} />
    </main>
  );
}
