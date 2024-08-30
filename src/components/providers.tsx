"use client";

import { DashboardContextProvider } from "@/contexts/dashboard-context";
import { ReactNode } from "react";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return <DashboardContextProvider>{children}</DashboardContextProvider>;
}
