import DashboardHeader from "@/components/dashboarHeader";
import Sidebar from "@/components/sidebar";
import { ReactNode } from "react";

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <main>
      <div className="flex flex-row">
        <div className="flex">
          <Sidebar />
        </div>
        <div className="flex flex-col w-full lg:w-[86%] lg:ml-[14%] lg:pl-2 h-full ">
          <DashboardHeader />
          {children}
        </div>
      </div>
    </main>
  );
}
