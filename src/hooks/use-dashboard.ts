import { DashboardContext, DashboardContextData } from "@/contexts/dashboard-context";
import { useContext } from "react";

export function useDashboard() {
  const context = useContext(DashboardContext);
  return context as DashboardContextData;
}
