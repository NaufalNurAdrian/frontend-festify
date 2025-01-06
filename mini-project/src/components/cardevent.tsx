import { formatPrice } from "@/helpers/formatPrice";
import Link from "next/link";
import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

interface IEventCard {
  title?: string;
  thumbnail?: string;
  slug?: string;
  description?: string;
  username?: string;
  avatar?: string;
  location?: string;
  price?: number;
  isLoading?: boolean; // Tambahkan prop untuk menentukan apakah sedang loading
}

const EventCard: React.FC<IEventCard> = ({
  title,
  thumbnail,
  slug,
  username,
  avatar,
  location,
  price,
  isLoading = false, // Default false
}: IEventCard) => {
  if (isLoading) {
    return (
      <div className="animate-pulse mx-auto w-full max-w-lg bg-gray-100 border border-gray-200 rounded-lg shadow-md overflow-hidden">
        <div className="w-full h-40 bg-gray-300"></div>
        <div className="p-4">
          <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6 mb-4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
            <div className="h-4 bg-gray-300 rounded w-1/3"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Link href={`/event/${slug || ""}`}>
      <div className="mx-auto w-full max-w-lg bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
        <img src={thumbnail} alt={title} className="w-full h-40 object-cover" />

        <div className="p-4">
          <h3 className="text-lg font-bold text-gray-800 truncate">{title}</h3>
          <p className="mt-2 text-base font-semibold text-gray-800">
            {formatPrice(price || 0)}
          </p>
          <p className="text-sm text-gray-500 flex items-center gap-2 pb-4">
            <FaMapMarkerAlt className="text-gray-400 flex" />
            {location}
          </p>
          <hr className=" border-gray-400 py-2" />
          <p className="mt-1 text-sm text-gray-500 flex items-center">
            <img
              src={avatar}
              alt="avatar"
              className="w-8 h-7 rounded-full mr-3"
            />
            <span>{username}</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
