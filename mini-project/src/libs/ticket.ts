import axios from "axios";

export const updateTicketSeats = async (ticketId: string, seats: number) => {
  try {
    const response = await axios.patch(`/api/tickets/${ticketId}`, { seats });
    return response.data.events;
  } catch (error) {
    console.error("Error updating ticket seats:", error);
    throw error;
  }
};
