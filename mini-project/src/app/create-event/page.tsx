"use client";
import { useState } from "react";

const CreateEvent = () => {
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    location: "",
    startTime: "",
    endTime: "",
    category: "",
    thumbnail: null as File | null,
  });

  const [tickets, setTickets] = useState([
    { type: "", price: 0, seats: 0, lastOrder: "" },
  ]);

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
        [name]: files && files[0], // Ambil file pertama jika ada
      }));
    } else {
      setEventData((prev) => ({
        ...prev,
        [name]: value, // Untuk input selain file
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

  const handleCreateEvent = async () => {
    try {
      const formData = new FormData();
      Object.entries(eventData).forEach(([key, value]) => {
        formData.append(key, value as string | Blob);
      });

      const response = await fetch("http://localhost:8000/api/event/create/", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        alert(`Event created successfully! Event ID: ${result.event.event_id}`);
      } else {
        alert(`Error creating event: ${result.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to create event.");
    }
  };

  const handleCreateTickets = async (eventId: number) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/event/create/ticket/${eventId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ tickets }),
        }
      );

      const result = await response.json();
      if (response.ok) {
        alert("Tickets created successfully!");
      } else {
        alert(`Error creating tickets: ${result.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to create tickets.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Event</h1>
      <div className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Event Title"
          value={eventData.title}
          onChange={handleEventChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={eventData.description}
          onChange={handleEventChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={eventData.location}
          onChange={handleEventChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
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
        <select
          name="category"
          value={eventData.category}
          onChange={handleEventChange}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="MUSIC">MUSIC</option>
          <option value="FILM">FILM</option>
          <option value="SPORT">SPORT</option>
          <option value="EDUCATION">EDUCATION</option>
        </select>
        <input
          type="file"
          name="thumbnail"
          onChange={handleEventChange}
          className="w-full p-2"
        />
        <button
          onClick={handleCreateEvent}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Create Event
        </button>
      </div>

      <h2 className="text-xl font-bold mt-6">Tickets</h2>
      {tickets.map((ticket, index) => (
        <div key={index} className="space-y-2 border p-4 rounded mb-4">
          <input
            type="text"
            placeholder="Type"
            value={ticket.type}
            onChange={(e) => handleTicketChange(index, "type", e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="number"
            placeholder="Price"
            value={ticket.price}
            onChange={(e) =>
              handleTicketChange(index, "price", Number(e.target.value))
            }
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="number"
            placeholder="Seats"
            value={ticket.seats}
            onChange={(e) =>
              handleTicketChange(index, "seats", Number(e.target.value))
            }
            className="w-full p-2 border border-gray-300 rounded"
          />
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
      <button
        onClick={addTicket}
        className="px-4 py-2 bg-green-500 text-white rounded"
      >
        Add Ticket
      </button>
      <button
        onClick={() => handleCreateTickets(1)} // Replace `1` with the actual event ID after creating event
        className="px-4 py-2 bg-blue-500 text-white rounded mt-4"
      >
        Create Tickets
      </button>
    </div>
  );
};

export default CreateEvent;
