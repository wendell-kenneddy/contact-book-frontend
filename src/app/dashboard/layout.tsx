import { Providers } from "@/components/providers";
import { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return <Providers>{children}</Providers>;
}
