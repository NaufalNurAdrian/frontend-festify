import { formatDate, formatDateTime } from "@/helpers/formatDate";
import React, { useState } from "react";
import { FaExclamationTriangle, FaMinus, FaPlus } from "react-icons/fa";
import { FiClock } from "react-icons/fi";
import { Slide, toast, ToastContainer } from "react-toastify";

interface TicketProps {
  type: string;
  price: number;
  seats: number;
 ticket_id: number;
  lastOrder: string;
  onUpdateSeats: (
    ticket_id: number,
    seatsToBuy: number,
    totalPrice: number,
    ticketType: string
  ) => void;
}

const TicketCard: React.FC<TicketProps> = ({
  type,
  price,
  seats,
  ticket_id,
  lastOrder,
  onUpdateSeats,
}) => {
  const [seatsToBuy, setSeatsToBuy] = useState(0);

  const handleIncrease = () => {
    const toastId = "maxSeatsWarning"; // ID unik untuk toast warning

    if (seatsToBuy >= 5) {
      // Cek apakah toast sudah aktif sebelum memunculkan toast baru
      if (!toast.isActive(toastId)) {
        toast.warning("Maksimal pembelian adalah 5 seats!", {
          hideProgressBar: true,
          icon: (
            <FaExclamationTriangle
              style={{ color: "#FB0404" }}
              className="text-2xl"
            />
          ),
          transition: Slide,
          toastId,
          className: "custom-toast",
        });
      }
      return;
    }

    const newSeatsToBuy = seatsToBuy + 1;
    setSeatsToBuy(newSeatsToBuy);
    onUpdateSeats(ticket_id, newSeatsToBuy, newSeatsToBuy * price, type);
  };

  const handleDecrease = () => {
    if (seatsToBuy > 0) {
      const newSeatsToBuy = seatsToBuy - 1;
      setSeatsToBuy(newSeatsToBuy);
      onUpdateSeats(ticket_id, newSeatsToBuy, newSeatsToBuy * price, type);
    }
  };

  return (
    <div className="relative bg-rose-50 border border-red rounded-lg p-6 mb-6 max-w-2xl mx-auto flex justify-between items-center border-dashed clip-path-notch">
      {/* Notch Kiri */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 w-8 h-8 bg-blue-50 rounded-full z-10 border-none "></div>
      <div className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 w-8 h-8 border border-dashed border-red rounded-full z-20 bg-[#f5f5f5]"></div>

      {/* Notch Kanan */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 w-8 h-8 bg-blue-50 rounded-full z-10 border-none clip-path-notch"></div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 w-8 h-8 border border-dashed border-red rounded-full z-20 bg-[#f5f5f5] clip-path-notch"></div>

      {/* Informasi Tiket */}
      <div className="flex-1">
        <h3 className="text-lg font-medium mb-1">{type}</h3>
        <p className="text-red mb-2 flex items-center text-sm font-extralight">
          <span className="mr-1 ">
            <FiClock />
          </span>
          Berakhir {formatDate(lastOrder)} • {formatDateTime(lastOrder)} WIB
        </p>
        <hr className="border-t border-dashed mb-2 border-gray-500" />
        <p className="font-bold text-xl">Rp{price.toLocaleString("id-ID")}</p>
      </div>

      {/* Kontrol Jumlah Tiket */}
      <div className="flex items-center">
        <button
          onClick={handleDecrease}
          className="w-8 h-8 flex items-center justify-center border border-red rounded-full text-red hover:bg-rose-200"
        >
          <FaMinus />
        </button>
        <span className="mx-4 text-lg">{seatsToBuy}</span>
        <button
          onClick={handleIncrease}
          className="w-8 h-8 flex items-center justify-center border border-red rounded-full text-red hover:bg-rose-200"
        >
          <FaPlus />
        </button>
      </div>
    </div>
  );
};

export default TicketCard;
