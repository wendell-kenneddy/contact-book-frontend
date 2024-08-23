import { ContactData } from "@/components/contact";
import { clientFetch } from "@/lib/client-fetch";
import { env } from "@/lib/env";
import { deleteCookie } from "cookies-next";
import { redirect } from "next/navigation";
import { createContext, ReactNode, useEffect, useState } from "react";

export interface DashboardContextData {
  contacts: ContactData[];
  isFetchingContacts: boolean;
  pageIndex: number;
  updatePageIndex: (newIndex: number) => void;
}

interface DashboardContextProviderProps {
  children: ReactNode;
}

export const DashboardContext = createContext<DashboardContextData | null>(null);

export function DashboardContextProvider({ children }: DashboardContextProviderProps) {
  const [contacts, setContacts] = useState<ContactData[]>([]);
  const [isFetchingContacts, setIsFetchingContacts] = useState(false);
  const [pageIndex, setPageIndex] = useState(1);

  useEffect(() => {
    setIsFetchingContacts(true);

    clientFetch(`${env.API_BASE_URL}/contacts`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      mode: "cors",
      cache: "no-store",
      body: JSON.stringify({ pageIndex }),
    })
      .then((res) => {
        if (res.status == 401) {
          deleteCookie("access-token", { path: "/" });
          deleteCookie("refresh-token", { path: "/" });
          redirect("/login");
        }

        return res.json();
      })
      .then((json) => setContacts(json))
      .catch((err) => console.log(err));

    setIsFetchingContacts(false);
  }, [pageIndex]);

  function updatePageIndex(newIndex: number) {
    setPageIndex(newIndex);
  }

  return (
    <DashboardContext.Provider value={{ contacts, isFetchingContacts, pageIndex, updatePageIndex }}>
      {children}
    </DashboardContext.Provider>
  );
}
