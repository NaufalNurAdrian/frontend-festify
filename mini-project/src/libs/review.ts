import axios from "@/helpers/axios";

export async function getReviews(eventId: string) {
  try {
    const { data } = await axios.get(`/reviews/${eventId}`);

    return data.reviews;
  } catch (error) {
    console.log("Error get reviews:", error);
  }
}
