"use client";

import { useDashboard } from "@/hooks/use-dashboard";
import { ArrowLeft, ArrowRight, Plus } from "@phosphor-icons/react";
import { useState } from "react";
import { Button } from "@/components/button";
import { ContactData } from "@/components/contact";
import { ContactList } from "@/components/contact-list";
import { DeleteContactDialog } from "@/components/delete-contact-dialog";
import { EditContactModal } from "@/components/edit-contact-dialog";
import { CreateContactModal } from "@/components/create-contact-modal";

export default function Dashboard() {
  const { contacts, pageIndex, updatePageIndex, isFetchingContacts } = useDashboard();
  const [contactToDeleteID, setContactToDeleteID] = useState<string | null>(null);
  const [contactToEditID, setContactToEditID] = useState<string | null>(null);
  const [isCreateContactModalOpen, setIsCreateContactModalOpen] = useState(false);

  function paginateForward() {
    updatePageIndex(pageIndex + 1);
  }

  function paginateBackwards() {
    updatePageIndex(pageIndex - 1);
  }

  return (
    <main className="flex flex-col items-center gap-6 text-zinc-100 pb-4">
      <div className="flex items-center gap-2">
        <h1 className="text-xl font-medium">Your contacts</h1>

        <Button
          name="Add contact"
          variant="secondary"
          onClick={() => setIsCreateContactModalOpen(true)}
        >
          <Plus className="size-4 fill-teal-400" />
        </Button>
      </div>

      {isFetchingContacts ? (
        <span className="font-medium text-gray-100">Just a moment...</span>
      ) : (
        <ContactList
          contacts={contacts}
          onEditRequest={(id: string) => setContactToEditID(id)}
          onDeleteRequest={(id: string) => setContactToDeleteID(id)}
        />
      )}

      <div className="flex w-full items-center justify-between">
        <Button
          variant="secondary"
          disabled={isFetchingContacts || pageIndex == 1}
          onClick={paginateBackwards}
        >
          <ArrowLeft className="size-6 fill-teal-400" fill="bold" />
        </Button>

        <Button
          variant="secondary"
          disabled={isFetchingContacts || contacts.length < 10}
          onClick={paginateForward}
        >
          <ArrowRight className="size-6 fill-teal-400" fill="bold" />
        </Button>
      </div>

      {!!contactToDeleteID && (
        <DeleteContactDialog
          open={!!contactToDeleteID}
          contactID={contactToDeleteID}
          onClose={() => setContactToDeleteID(null)}
        />
      )}

      {!!contactToEditID && (
        <EditContactModal
          open={true}
          contact={contacts.find((c) => c.id == contactToEditID) as ContactData}
          onClose={() => setContactToEditID(null)}
        />
      )}

      {isCreateContactModalOpen && (
        <CreateContactModal
          open={isCreateContactModalOpen}
          onClose={() => setIsCreateContactModalOpen(false)}
        />
      )}
    </main>
  );
}
