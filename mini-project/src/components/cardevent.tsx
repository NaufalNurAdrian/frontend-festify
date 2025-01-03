import Link from "next/link";
import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

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
          <div
            className="text-sm text-gray-500 line-clamp-3"
            dangerouslySetInnerHTML={{ __html: description }}
          />
          <p className="mt-2 text-base font-semibold text-gray-800"></p>
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
