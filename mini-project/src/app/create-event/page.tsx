"use client";

import RichTextEditor from "@/components/form/events/textEditor";
import { useState } from "react";
// Sesuaikan path sesuai lokasi file RichTextEditor

const CreateEvent = () => {
  const [eventData, setEventData] = useState({
    title: "",
    description: "", // Gunakan description untuk React Quill
    location: "",
    startTime: "",
    endTime: "",
    category: "MUSIC",
    thumbnail: null as File | null,
  });

  const [tickets, setTickets] = useState([
    { type: "", price: 0, seats: 0, lastOrder: "" },
  ]);

  const enumCategories = ["MUSIC", "FILM", "SPORT", "EDUCATION"];

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
    setTickets(updatedTickets);
  };

  const addTicket = () => {
    setTickets([...tickets, { type: "", price: 0, seats: 0, lastOrder: "" }]);
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

      const response = await fetch("http://localhost:8000/api/event/create/", {
        method: "POST",
        body: formData,
        headers: { Authorization: `Bearer ${token}` },
      });

      const result = await response.json();

      if (response.ok) {
        const eventId = result.event_id;

        if (
          tickets.some(
            (ticket) =>
              !ticket.type ||
              !ticket.price ||
              !ticket.seats ||
              !ticket.lastOrder
          )
        ) {
          alert("All ticket fields are required.");
          return;
        }

        const ticketResponse = await fetch(
          `http://localhost:8000/api/event/create/ticket/${eventId}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ tickets }),
          }
        );

        const ticketResult = await ticketResponse.json();

        if (ticketResponse.ok) {
          alert("Event and tickets created successfully!");
        } else {
          alert(`Error creating tickets: ${ticketResult.message}`);
        }
      } else {
        alert("Error creating event");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to create event and tickets.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Event</h1>

      <div className="space-y-4 items-center pb-1">
        <h1 className="font-semibold">Event Title</h1>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={eventData.title}
          onChange={handleEventChange}
          className="w-full p-2 border border-gray-300 rounded my-2"
        />
        {/* Gunakan RichTextEditor untuk mengatur description */}
        <h1 className="font-semibold">Description</h1>
        <RichTextEditor
          setFieldValue={(field, value) =>
            setEventData((prev) => ({
              ...prev,
              [field]: value,
            }))
          }
        />
        <h1 className="font-semibold">Location</h1>
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={eventData.location}
          onChange={handleEventChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <h1 className="font-semibold">Start & End Date Time</h1>
        <input
          type="datetime-local"
          name="startTime"
          value={eventData.startTime}
          onChange={handleEventChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="datetime-local"
          name="endTime"
          value={eventData.endTime}
          onChange={handleEventChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <h1 className="font-semibold">Category Event</h1>
        <select
          name="category"
          value={eventData.category}
          onChange={handleEventChange}
          className="w-full p-2 border border-gray-300 rounded"
        >
          {enumCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <h1>
          {" "}
          <span className="font-semibold"> Thumbnail</span>
          <input
            type="file"
            name="thumbnail"
            onChange={handleEventChange}
            className="w-full p-2"
          />
        </h1>
      </div>

      <h2 className="text-xl font-bold mt-6">Tickets</h2>
      {tickets.map((ticket, index) => (
        <div key={index} className="space-y-2 border p-4 rounded mb-4">
          <h1 className="font-medium">Type Tickets</h1>
          <input
            type="text"
            placeholder="Type"
            value={ticket.type}
            onChange={(e) => handleTicketChange(index, "type", e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <h1 className="font-medium">Price</h1>
          <input
            type="number"
            placeholder="Price"
            value={ticket.price}
            onChange={(e) =>
              handleTicketChange(index, "price", Number(e.target.value))
            }
            className="w-full p-2 border border-gray-300 rounded"
          />
          <h1 className="font-medium">Ticket Stock</h1>
          <input
            type="number"
            placeholder="Seats"
            value={ticket.seats}
            onChange={(e) =>
              handleTicketChange(index, "seats", Number(e.target.value))
            }
            className="w-full p-2 border border-gray-300 rounded"
          />
          <h1 className="font-medium">Last Order for buy Ticket</h1>
          <input
            type="datetime-local"
            placeholder="Last Order"
            value={ticket.lastOrder}
            onChange={(e) =>
              handleTicketChange(index, "lastOrder", e.target.value)
            }
            className="w-full p-2 border border-gray-300 rounded"
          />
          <button
            onClick={() => removeTicket(index)}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Remove Ticket
          </button>
        </div>
      ))}
      <div className="flex justify-between items-center">
        <button
          onClick={addTicket}
          className="px-4 py-2 bg-red text-white rounded"
        >
          Add Ticket
        </button>
        <button
          onClick={handleCreateEventAndTickets}
          className="px-4 py-2 bg-red text-white rounded"
        >
          Create Event and Tickets
        </button>
      </div>
    </div>
  );
};

export default CreateEvent;
