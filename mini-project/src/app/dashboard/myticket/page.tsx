"use client";

import React from 'react';
import { useQRCode } from 'next-qrcode';
import EventReview from "@/components/eventReview";
import authGuard from "@/hoc/authGuard";
import { useEffect, useState } from "react";
import { FaClock } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";

interface Ticket {
  orderId: number;
  subtotal: number;
  qty: number;
  transaction: {
    finalPrice: number;
    transactionDate: string;
    expiredAt: string;
    paymentStatus: string;
  };
  ticketId: {
    type: string;
    event: {
      event_id: string;
      title: string;
      location: string;
      startTime: string;
      endTime: string;
    };
  };
}

function Tickets() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const { Canvas } = useQRCode();

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.log("Login First");
          return;
        }
        const base_url = process.env.NEXT_PUBLIC_BASE_URL_BE;
        const response = await fetch(`${base_url}/users/ticket`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setTickets(data.tickets);
        } else {
          console.error("Error fetching tickets:", data.message);
        }
      } catch (error) {
        console.error("Error fetching tickets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  if (loading) {
    return <div className="text-xs">Loading...</div>;
  }

  if (!tickets || tickets.length === 0) {
    return <div className="text-xs">No tickets found.</div>;
  }

  return (
    <main className="container mx-auto w-full flex flex-col px-2 tablet:px-10 py-4">
      <h1 className="text-base font-semibold my-2">Your Tickets</h1>
      {tickets.map((ticket, idx) => (
        <div
          key={idx}
          className="relative bg-rose-50 border border-red rounded-lg p-3 mb-4 mx-auto border-dashed clip-path-notch"
          style={{
            width: "90%",
            maxWidth: "800px",
            height: "100%",
          }}
        >
          {/* Notch Styling */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -ml-2 w-4 h-4 border border-dashed border-red rounded-full bg-[#f5f5f5]"></div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 -mr-2 w-4 h-4 border border-dashed border-red rounded-full bg-[#f5f5f5]"></div>

          {/* Ticket Details */}
          <div className="py-2 flex flex-col gap-1">
            <h3 className="font-semibold line-clamp-1 text-sm">
              {ticket.ticketId.event.title}
            </h3>
            <h3>{ticket.transaction.paymentStatus}</h3>
            <p className="flex items-center gap-2 text-xs text-gray-700">
              <SlCalender className="text-lightBlue" />
              {new Date(
                ticket.ticketId.event.startTime
              ).toLocaleDateString()} -{" "}
              {new Date(ticket.ticketId.event.endTime).toLocaleDateString()}
            </p>
            <p className="flex items-center gap-2 text-xs text-gray-700">
              <FaClock className="text-lightBlue" />
              {new Date(
                ticket.ticketId.event.startTime
              ).toLocaleTimeString()} -{" "}
              {new Date(ticket.ticketId.event.endTime).toLocaleTimeString()}
            </p>
            <p className="flex items-center gap-2 text-xs text-gray-700">
              <FaLocationDot className="text-lightBlue" />
              {ticket.ticketId.event.location}
            </p>
          </div>

          {/* Ticket Table */}
          <table className="w-full mt-2 text-xs">
            <thead>
              <tr className="border-dashed border-t border-b border-black/50">
                <th className="py-1 text-start">Ticket Type</th>
                <th className="text-end">Subtotal</th>
                <th className="text-end">Quantity</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-start">{ticket.ticketId.type}</td>
                <td className="text-end">{ticket.subtotal}</td>
                <td className="text-end">{ticket.qty}</td>
              </tr>
            </tbody>
          </table>
          <EventReview eventId={ticket.ticketId.event.event_id} />
        </div>
      ))}
    </main>
  );
}

export default authGuard(Tickets);
