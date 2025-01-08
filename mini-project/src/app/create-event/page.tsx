"use client";

import RichTextEditor from "@/components/form/events/textEditor";
import authGuard from "@/hoc/authGuard";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaImage, FaTags, FaTicketAlt } from "react-icons/fa";
import {
  FiPlus,
  FiSave,
  FiTrash,
  FiFileText,
  FiMapPin,
  FiCalendar,
} from "react-icons/fi";

import { Slide, toast } from "react-toastify";

const CreateEvent = () => {
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    location: "",
    startTime: "",
    endTime: "",
    category: "MUSIC",
    thumbnail: null as File | null,
  });

  const [tickets, setTickets] = useState([
    { type: "STANDARD", price: 0, seats: 0, lastOrder: "" },
  ]);

  const enumCategories = ["MUSIC", "FILM", "SPORT", "EDUCATION"];
  const ticketTypes = ["STANDARD", "VIP", "VVIP", "FREE"];
  const [, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const tokenFromLocalStorage = localStorage.getItem("token");
    if (tokenFromLocalStorage) {
      setToken(tokenFromLocalStorage);
    }
  }, []);

  const handleEventChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    if (e.target instanceof HTMLInputElement && e.target.type === "file") {
      const files = e.target.files;
      setEventData((prev) => ({
        ...prev,
        [name]: files && files[0],
      }));
    } else {
      setEventData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleTicketChange = (
    index: number,
    field: string,
    value: string | number
  ) => {
    const updatedTickets = [...tickets];
    updatedTickets[index] = { ...updatedTickets[index], [field]: value };

    // Jika memilih FREE, harga otomatis menjadi 0 dan field price nonaktif
    if (field === "type" && value === "FREE") {
      updatedTickets[index].price = 0;
    }

    setTickets(updatedTickets);
  };

  const addTicket = () => {
    setTickets([
      ...tickets,
      { type: "STANDARD", price: 0, seats: 0, lastOrder: "" },
    ]);
  };

  const removeTicket = (index: number) => {
    setTickets(tickets.filter((_, i) => i !== index));
  };

  const handleCreateEventAndTickets = async () => {
    try {
      const formData = new FormData();
      Object.entries(eventData).forEach(([key, value]) => {
        formData.append(key, value as string | Blob);
      });

      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found. Please Login.");
      }

      const base_url = process.env.NEXT_PUBLIC_BASE_URL_BE;

      // Create event
      const response = await fetch(`${base_url}/event/create/`, {
        method: "POST",
        body: formData,
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        const errorResult = await response.json();
        throw new Error(errorResult.message || "Failed to create event");
      }

      const result = await response.json();
      const eventId = result.event_id;

      // Validate tickets
      if (
        tickets.some(
          (ticket) => !ticket.type || !ticket.seats || !ticket.lastOrder
        )
      ) {
        toast.error("All ticket fields are required.");
        return;
      }

      // Create tickets
      const ticketResponse = await fetch(
        `${base_url}/event/create/ticket/${eventId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ tickets }),
        }
      );

      if (!ticketResponse.ok) {
        const ticketResult = await ticketResponse.json();
        throw new Error(ticketResult.message || "Failed to create tickets");
      }

      // Success message and redirect
      toast.success("Event and tickets created successfully!", {
        hideProgressBar: true,
        transition: Slide,
        className: "custom-toast",
      });

      router.push("/dashboard/myevent");
      return; // Hentikan eksekusi di sini setelah sukses
    } catch (error: any) {
      console.error("Error:", error);
      toast.error(error.message || "Failed to create event and tickets.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg my-4">
      <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2 mb-6">
        <FiFileText /> Create Event
      </h1>

      <div className="space-y-6">
        <div>
          <label className="text-lg font-medium text-gray-700 mb-2 flex items-center gap-2">
            <FiFileText /> Event Title
          </label>
          <input
            type="text"
            name="title"
            placeholder="Enter event title"
            value={eventData.title}
            onChange={handleEventChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-red focus:outline-none"
          />
        </div>

        <div>
          <label className="text-lg font-medium text-gray-700 mb-2 flex items-center gap-2">
            <FiFileText /> Description
          </label>
          <RichTextEditor
            setFieldValue={(field, value) =>
              setEventData((prev) => ({
                ...prev,
                [field]: value,
              }))
            }
          />
        </div>

        <div>
          <label className="text-lg font-medium text-gray-700 mb-2 flex items-center gap-2">
            <FiMapPin /> Location
          </label>
          <input
            type="text"
            name="location"
            placeholder="Event location"
            value={eventData.location}
            onChange={handleEventChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-red focus:outline-none"
          />
        </div>

        <div>
          <label className=" text-lg font-medium text-gray-700 mb-2 flex items-center gap-2">
            <FiCalendar /> Event Date & Time
          </label>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="datetime-local"
              name="startTime"
              value={eventData.startTime}
              onChange={handleEventChange}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-red focus:outline-none"
            />
            <input
              type="datetime-local"
              name="endTime"
              value={eventData.endTime}
              onChange={handleEventChange}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-red focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="text-lg font-medium text-gray-700 mb-2 flex items-center gap-2">
            <FaTags /> Category
          </label>
          <select
            name="category"
            value={eventData.category}
            onChange={handleEventChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm bg-white focus:ring-2 focus:ring-red focus:outline-none"
          >
            {enumCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-lg font-medium text-gray-700 mb-2 flex items-center gap-2">
            <FaImage /> Thumbnail
          </label>
          <input
            type="file"
            name="thumbnail"
            onChange={handleEventChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-red focus:outline-none"
          />
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
        <FaTicketAlt /> Tickets
      </h2>

      {tickets.map((ticket, index) => (
        <div
          key={index}
          className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm mb-4"
        >
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700">
                Ticket Type
              </label>
              <select
                value={ticket.type}
                onChange={(e) =>
                  handleTicketChange(index, "type", e.target.value)
                }
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-red focus:outline-none"
              >
                {ticketTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <input
                type="number"
                placeholder="Price"
                value={ticket.price}
                disabled={ticket.type === "FREE"}
                onChange={(e) =>
                  handleTicketChange(index, "price", Number(e.target.value))
                }
                className={`w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-red focus:outline-none ${
                  ticket.type === "FREE" ? "bg-gray-200 cursor-not-allowed" : ""
                }`}
              />
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700">
                Seats
              </label>
              <input
                type="number"
                placeholder="Seats"
                value={ticket.seats}
                onChange={(e) =>
                  handleTicketChange(index, "seats", Number(e.target.value))
                }
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-red focus:outline-none"
              />
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700">
                Last Order
              </label>
              <input
                type="datetime-local"
                value={ticket.lastOrder}
                onChange={(e) =>
                  handleTicketChange(index, "lastOrder", e.target.value)
                }
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-red focus:outline-none"
              />
            </div>
          </div>
          <button
            onClick={() => removeTicket(index)}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg shadow-sm hover:bg-red-600 focus:ring-2 focus:ring-red focus:outline-none flex items-center gap-2"
          >
            <FiTrash /> Remove Ticket
          </button>
        </div>
      ))}

      <div className="flex justify-between items-center mt-6">
        <button
          onClick={addTicket}
          className="px-4 py-2 bg-red text-white rounded-lg shadow-sm hover:bg-codgray focus:ring-2 focus:ring-red focus:outline-none flex items-center gap-2"
        >
          <FiPlus /> Add Ticket
        </button>
        <button
          onClick={handleCreateEventAndTickets}
          className="px-4 py-2 bg-codgray text-white rounded-lg shadow-sm hover:bg-red focus:ring-2 focus:ring-red focus:outline-none flex items-center gap-2"
        >
          <FiSave /> Create Event
        </button>
      </div>
    </div>
  );
};

export default authGuard(CreateEvent);
