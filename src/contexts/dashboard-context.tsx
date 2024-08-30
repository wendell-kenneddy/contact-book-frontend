"use client";

import { ContactData } from "@/components/contact";
import { createContext, ReactNode, useEffect, useState } from "react";

export interface DashboardContextData {
  contacts: ContactData[];
  isFetchingContacts: boolean;
  pageIndex: number;
  tag: number;
  updatePageIndex: (newIndex: number) => void;
  incrementTag: () => void;
}

interface DashboardContextProviderProps {
  children: ReactNode;
}

export const DashboardContext = createContext<DashboardContextData | null>(null);

export function DashboardContextProvider({ children }: DashboardContextProviderProps) {
  const [contacts, setContacts] = useState<ContactData[]>([]);
  const [isFetchingContacts, setIsFetchingContacts] = useState(false);
  const [pageIndex, setPageIndex] = useState(1);
  const [tag, setTag] = useState(1);

  function incrementTag() {
    setTag((prev) => prev + 1);
  }

  useEffect(() => {
    setIsFetchingContacts(true);

    fetch(`/api/contacts?pageIndex=${pageIndex}`, { cache: "no-store" })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const { contacts }: { contacts: ContactData[] } = data;
        setContacts(contacts ?? []);
      })
      .catch((err) => console.log(err));

    setIsFetchingContacts(false);
  }, [tag, pageIndex]);

  function updatePageIndex(newIndex: number) {
    setPageIndex(newIndex);
    incrementTag();
  }

  return (
    <DashboardContext.Provider
      value={{
        contacts,
        isFetchingContacts,
        pageIndex,
        tag,
        updatePageIndex,
        incrementTag,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}
