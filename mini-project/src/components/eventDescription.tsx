import React from "react";

interface EventDescriptionProps {
  description: string;
}

const EventDescription: React.FC<EventDescriptionProps> = ({ description }) => {
  return (
    <div>
      <div
        className="text-gray-700"
        dangerouslySetInnerHTML={{ __html: description }}
      />

      <h3 className="mt-6 font-bold text-gray-800">Syarat & Ketentuan</h3>
      <ul className="list-disc list-inside mt-2 text-gray-600">
        <li>
          <strong>No outside food or drink allowed</strong>
        </li>
        <li className="italic text-red-500">
          Dilarang membawa makanan atau minuman dari luar Bengkel Space
        </li>
        <li>Tickets are non-refundable</li>
        <li className="italic text-red-500">
          Tiket yang sudah dibeli tidak dapat dikembalikan
        </li>
      </ul>
    </div>
  );
};

export default EventDescription;
