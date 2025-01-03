import React from "react";
import TicketCard from "@/components/ticketCard";
import { ITicket } from "@/types/event";
interface EventTicketProps {
  tickets: ITicket[];
  onUpdateSeats: (
    ticket_id: number,
    seatsToBuy: number,
    newTotalPrice: number,
    ticketType: string
  ) => void;
}

const EventTicket: React.FC<EventTicketProps> = ({
  tickets,
  onUpdateSeats,
}) => {
  return (
    <div>
      <h3 className="font-bold text-lg text-gray-800 mb-4 py-2">
        Ticket Category
      </h3>
      {tickets.map((ticket) => (
        <TicketCard
          key={ticket.ticket_id}
          ticket_id={ticket.ticket_id}
          type={ticket.type}
          price={ticket.price}
          seats={ticket.seats}
          lastOrder={ticket.lastOrder}
          onUpdateSeats={onUpdateSeats}
        />
      ))}
    </div>
  );
};

export default EventTicket;
