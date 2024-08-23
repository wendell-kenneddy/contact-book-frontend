import { DashboardContextProvider } from "@/contexts/dashboard-context";
import { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return <DashboardContextProvider>{children}</DashboardContextProvider>;
}
