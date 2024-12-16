"use client";
import React, { useEffect, useState } from "react";
import { formatDate, formatDateTime } from "@/helpers/formatDate";
import { formatPrice } from "@/helpers/formatPrice";
import { FaCalendarAlt, FaClock, FaMapMarkerAlt } from "react-icons/fa";
import Image from "next/image";
import { IEvent } from "@/types/event";
import EventDescription from "./eventDescription";
import EventTicket from "./eventTicket";

interface EventTabsProps {
  data: IEvent;
}

const EventTabs: React.FC<EventTabsProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState("DESKRIPSI");
  const [totalPrice, setTotalPrice] = useState(data.Ticket[0].price);
  const [selectedTicketCount, setSelectedTicketCount] = useState(0);
  const [selectedTicketType, setSelectedTicketType] = useState<string>("");
  //   const [mounted, setMounted] = useState(false);

  //   useEffect(() => {
  //     setMounted(true);
  //   }, []);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleUpdateSeats = (
    ticketId: string,
    seatsToBuy: number,
    newTotalPrice: number,
    ticketType: string
  ) => {
    setTotalPrice(newTotalPrice);
    setSelectedTicketCount(seatsToBuy);
    setSelectedTicketType(ticketType); // untuk update jumlah tiket yang dipilih
  };

  const ticketType = selectedTicketType || data.Ticket[0].type;

  return (
    <div className="max-w-6xl mx-auto p-4 py-14">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Image
            src={data.thumbnail}
            alt="Event Thumbnail"
            width={700}
            height={300}
            className="rounded-lg"
          />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md max-w-sm">
          <h2 className="text-xl font-bold mb-4 pb-4">{data.title}</h2>
          <div className="space-y-2 text-gray-600">
            <div className="flex items-center gap-2">
              <FaCalendarAlt />
              <span>
                {formatDate(data.startTime)} - {formatDate(data.endTime)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <FaClock />
              <span>
                {formatDateTime(data.startTime)} -{" "}
                {formatDateTime(data.endTime)} WIB
              </span>
            </div>
            <div className="flex items-center gap-2 lg:pb-36 pb-24">
              <FaMapMarkerAlt />
              <span>{data.location}</span>
            </div>
          </div>
          <hr className="border border-dashed border-gray-400" />
          <p className="mt-4 text-sm text-gray-500">
            Diselenggarakan oleh{" "}
            <span className="font-medium text-lg flex flex-col">
              {data.organizer.username}
            </span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10">
        <div className="mt-8 md:col-span-2">
          <div className="border-b mb-4 flex text-center justify-center items-center">
            <button
              className={`pb-2 px-4 border-b-2 w-[50%] ${
                activeTab === "DESKRIPSI"
                  ? "border-red text-red"
                  : "text-gray-600"
              } font-semibold`}
              onClick={() => handleTabChange("DESKRIPSI")}
            >
              Description
            </button>
            <button
              className={`pb-2 px-4 w-[50%] ${
                activeTab === "TIKET"
                  ? "border-b-2 border-red text-red"
                  : "text-gray-600"
              } font-semibold`}
              onClick={() => handleTabChange("TIKET")}
            >
              Ticket
            </button>
          </div>

          {activeTab === "DESKRIPSI" && (
            <EventDescription description={data.description} />
          )}
          {activeTab === "TIKET" && (
            <EventTicket
              tickets={data.Ticket}
              onUpdateSeats={handleUpdateSeats}
            />
          )}
        </div>

        <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 h-60 w-full">
          <div className="flex items-start gap-3">
            <img
              src="/festify-tickets2.png"
              alt="Ikon Tiket"
              className="w-auto h-8"
            />
            <p className="text-gray-600 ">
              {selectedTicketCount === 0
                ? "You haven't selected a ticket yet. Please select one first ."
                : ticketType}
            </p>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600">
              {selectedTicketCount === 0
                ? "Starting price"
                : `Total ${selectedTicketCount} ticket`}
            </span>
            <span className="font-bold text-black">
              {formatPrice(totalPrice || data.Ticket[0].price)}
            </span>
          </div>
          <button className="w-full bg-red text-white py-2 rounded-lg font-medium">
            Buy Ticket
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventTabs;
