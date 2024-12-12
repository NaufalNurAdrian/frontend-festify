import Link from "next/link";
import React from "react";

interface IEventCard {
  title: string;
  thumbnail: string;
  slug: string;
  description: string;
  username: string;
  avatar: string;
  location: string;
}

const EventCard: React.FC<IEventCard> = ({
  title,
  thumbnail,
  slug,
  description,
  username,
  avatar,
  location,
}: IEventCard) => {
  return (
    <Link href={`/event/${slug}`}>
      <div className="mx-auto w-full max-w-lg bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
        <img src={thumbnail} alt={title} className="w-full h-40 object-cover" />

        <div className="p-4">
          <h3 className="text-lg font-bold text-gray-800 truncate">{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
          <p className="mt-2 text-base font-semibold text-gray-800"></p>
          <p className="text-sm text-gray-500">{location}</p>
          <p className="mt-1 text-sm text-gray-500">{username}</p>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
