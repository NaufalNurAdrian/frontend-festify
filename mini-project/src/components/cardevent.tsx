import React from "react";

interface EventCardProps {
  image: string; // URL gambar
  title: string; // Judul event
  date: string; // Tanggal event
  price: string; // Harga tiket
  organizer: string; // Penyelenggara
  location: string; // Lokasi event
}

const EventCard: React.FC<EventCardProps> = ({
  image,
  title,
  date,
  price,
  organizer,
  location,
}) => {
  return (
    <div className="mx-auto w-full max-w-lg bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
      {/* Gambar */}
      <img src={image} alt={title} className="w-full h-40 object-cover" />

      {/* Konten */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 truncate">{title}</h3>
        <p className="text-sm text-gray-500">{date}</p>
        <p className="mt-2 text-base font-semibold text-gray-800">{price}</p>
        <p className="mt-1 text-sm text-gray-500">{organizer}</p>
        <p className="text-sm text-gray-500">{location}</p>
      </div>
    </div>
  );
};

export default EventCard;
