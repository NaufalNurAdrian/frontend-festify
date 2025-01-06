"use client";
import React, { createContext, useEffect, useState } from "react";
import { formatDate, formatDateTime } from "@/helpers/formatDate";
import { formatPrice } from "@/helpers/formatPrice";
import { FaCalendarAlt, FaClock, FaMapMarkerAlt } from "react-icons/fa";
import Image from "next/image";
import { IEvent, ITicket } from "@/types/event";
import EventDescription from "./eventDescription";
import EventTicket from "./eventTicket";
import Link from "next/link";
import axios from "@/helpers/axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface EventTabsProps {
  data: IEvent;
  ticketResult: ITicket[];
  params: { event_id: string };
}

export interface ITicketContext {
  ticketId: ITicket;
  qty: number;
}

export interface TicketContextValue {
  OrderDetail: ITicketContext[] | null;
  setOrderDetail: (param: ITicketContext[] | null) => void;
}

export const TicketContext = createContext<TicketContextValue | null>(null);

const EventTabs: React.FC<EventTabsProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState("DESKRIPSI");
  const [totalPrice, setTotalPrice] = useState(data.Ticket?.[0]?.price || 0);
  const [selectedTicketCount, setSelectedTicketCount] = useState(0);
  const [selectedTicketType, setSelectedTicketType] = useState<string>("");
  const [OrderDetail, setOrderDetail] = useState<ITicketContext[] | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  if (loading) {
    return (
      <div className="loaderx-wrapper">
        <div className="loaderx"></div>
      </div>
    );
  }

  useEffect(() => {
    if (!data.Ticket || data.Ticket.length === 0) {
      console.warn("No tickets available for this event.");
    }
  }, [data.Ticket]);

  console.log("Data Ticket:", data.Ticket);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleUpdateSeats = (
    ticket_id: number,
    seatsToBuy: number,
    newTotalPrice: number,
    ticketType: string
  ) => {
    const selectedTicket = data.Ticket.find(
      (ticket) => ticket.ticket_id === ticket_id
    );

    if (!selectedTicket) {
      console.error("Ticket not found!");
      return;
    }

    setOrderDetail((prevOrderDetail) => {
      const updatedOrderDetail = [...(prevOrderDetail || [])];

      const ticketIndex = updatedOrderDetail.findIndex(
        (item) => item.ticketId.ticket_id === ticket_id
      );

      if (ticketIndex >= 0) {
        if (seatsToBuy === 0) {
          updatedOrderDetail.splice(ticketIndex, 1);
        } else {
          updatedOrderDetail[ticketIndex].qty = seatsToBuy;
        }
      } else {
        if (seatsToBuy > 0) {
          updatedOrderDetail.push({
            ticketId: selectedTicket,
            qty: seatsToBuy,
          });
        }
      }

      return updatedOrderDetail;
    });

    setTotalPrice(newTotalPrice);
    setSelectedTicketCount(
      OrderDetail ? OrderDetail.reduce((sum, item) => sum + item.qty, 0) : 0
    );
    setSelectedTicketType(ticketType);
  };

  const handleOrderTicket = async () => {
    if (!OrderDetail || OrderDetail.length === 0) {
      alert("Please select at least one ticket.");
      return;
    }
    setLoading(false);
    try {
      const bodyParameters = {
        totalPrice,
        finalPrice: totalPrice,
        OrderDetail: OrderDetail.map((item) => ({
          ticketId: {
            ticket_id: item.ticketId.ticket_id, // Pastikan ticket_id ada
            type: item.ticketId.type,
            price: item.ticketId.price,
          },
          qty: item.qty,
        })),
      };

      console.log("Payload sent to backend:", bodyParameters);

      const { data } = await axios.post("/transactions", bodyParameters, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      router.push(`/transactions/${data.orderId}`);
    } catch (err) {
      console.error("Failed to process transaction:", err);
      toast.error("Please login or register before buy tickets!");
    }
  };

  const ticketType = selectedTicketType || data.Ticket?.[0]?.type || "";

  useEffect(() => {
    if (OrderDetail) {
      setTotalPrice(
        OrderDetail.reduce((a, b) => a + b.ticketId.price * b.qty, 0)
      );
    }
  }, [OrderDetail]);

  if (loading) {
    return (
      <div className="loaderx-wrapper">
        <div className="loaderx"></div>
      </div>
    );
  }

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
                ? "You haven't selected a ticket yet. Please select one first."
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
              {formatPrice(totalPrice)}
            </span>
          </div>

          <button
            className={`w-full bg-red text-white py-2 rounded-lg font-medium ${
              selectedTicketCount === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleOrderTicket}
            disabled={selectedTicketCount === 0}
          >
            Buy Ticket
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventTabs;
