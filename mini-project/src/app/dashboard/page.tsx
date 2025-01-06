"use client";

import React, { useEffect, useState } from "react";
import EventTabs from "@/components/chart";
import DashboardData from "@/components/dashboardData";
import authGuard from "@/hoc/authGuard";
import { getEvent } from "@/libs/events";
import { IEvent } from "@/types/event";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const router = useRouter();
  const [data, setData] = useState<IEvent | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getEvent();
        setData(result);
      } catch (error) {
        console.error("Error fetching event data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto flex flex-col gap-2">
      <div className="w-full">
        <DashboardData />
      </div>
      <div className="flex flex-wrap justify-center gap-6 p-5">
        <div className="flex justify-center">
          {data && <EventTabs data={data} />}
        </div>
      </div>
    </div>
  );
};

// Wrap the Dashboard component with authGuard HOC
export default authGuard(Dashboard);
