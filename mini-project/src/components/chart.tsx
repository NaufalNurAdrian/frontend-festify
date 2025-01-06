"use client";
import React, { useState } from "react";
import { IEvent } from "@/types/event";
import IncomePerDayChart from "./chartDay";
import IncomePerMonthChart from "./chartMonth";
import IncomePerYearChart from "./chartYear";


interface EventTabsProps {
  data: IEvent;
}

const EventTabs: React.FC<EventTabsProps> = () => {
  const [activeTab, setActiveTab] = useState("DAY");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="">
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

          {activeTab === "DAY" && <IncomePerDayChart/>}
          {activeTab === "MONTH" && <IncomePerMonthChart/>}
          {activeTab === "YEAR" && <IncomePerYearChart/>}
        </div>
    </div>
  );
};

export default EventTabs;
