"use client";
import React, { useState } from "react";
import { IEvent } from "@/types/event";
import SimpleAreaChart from "./chart";
// import HorizontalBars from "./chart";

interface EventTabsProps {
  data: IEvent;
}

const EventTabs: React.FC<EventTabsProps> = () => {
  const [activeTab, setActiveTab] = useState("DAY");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="lg:w-[500px] w-auto mx-auto p-4 ">
        <div className="mt-1 md:col-span-2">
          <div className="border-b mb-4 flex text-center justify-center items-center">
            <button
              className={`pb-2 px-4 w-[50%] ${
                activeTab === "DAY"
                  ? "border-b-2 border-red text-red"
                  : "text-gray-600"
              } font-semibold`}
              onClick={() => handleTabChange("DAY")}
            >
              DAY
            </button>
            <button
              className={`pb-2 px-4 w-[50%] ${
                activeTab === "MONTH"
                  ? "border-b-2 border-red text-red"
                  : "text-gray-600"
              } font-semibold`}
              onClick={() => handleTabChange("MONTH")}
            >
              Month
            </button>
            <button
              className={`pb-2 px-4 w-[50%] ${
                activeTab === "YEAR"
                  ? "border-b-2 border-red text-red"
                  : "text-gray-600"
              } font-semibold`}
              onClick={() => handleTabChange("YEAR")}
            >
              Year
            </button>
          </div>

          {activeTab === "DAY" && <SimpleAreaChart/>}
          {activeTab === "TIKET" && ""}
          {activeTab === "YEAR" && ""}
        </div>
    </div>
  );
};

export default EventTabs;
