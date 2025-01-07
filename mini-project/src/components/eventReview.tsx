import { useState, useEffect } from "react";

interface Review {
  rating: number;
  review: string;
  createdAt: string;
  user: {
    user_id: string;
    username: string;
  };
}

interface ReviewProps {
  eventId: string;
}

function EventReview({ eventId }: ReviewProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState({ rating: 0, review: "" });
  const [loading, setLoading] = useState(false);
  const base_url = process.env.NEXT_PUBLIC_BASE_URL_BE;

  useEffect(() => {
    console.log("Fetching reviews for event ID:", eventId); // Check if the eventId is correct
    const fetchReviews = async () => {
      try {
        const response = await fetch(`${base_url}/reviews/${eventId}`);
        const data = await response.json();
        if (response.ok) {
          setReviews(data.reviews);
        } else {
          console.error("Error fetching reviews:", data.message);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [eventId]);

  const handleAddReview = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("User not authenticated.");
        return;
      }

      const response = await fetch(`${base_url}/reviews/${eventId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newReview),
      });

      if (response.ok) {
        const user = { user_id: "current_user", username: "You" };
        setReviews([
          ...reviews,
          { ...newReview, user, createdAt: new Date().toISOString() },
        ]);
        setNewReview({ rating: 0, review: "" });
      } else {
        const errorData = await response.json();
        console.error("Failed to add review:", errorData.message);
      }
    } catch (error) {
      console.error("Error adding review:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4">
      <h2 className="text-sm font-semibold mb-2">Event Reviews</h2>

      {/* Display existing reviews */}
      <div>
        {reviews.map((review, idx) => (
          <div
            key={idx}
            className="border rounded p-2 mb-2 border-codgray border-dashed"
          >
            <p className="text-xs">
              <strong>{review.user.username}</strong> -{" "}
              {new Date(review.createdAt).toLocaleDateString()}
            </p>
            <p className="text-xs">Rating: {review.rating} / 5</p>
            <p className="text-xs">{review.review}</p>
          </div>
        ))}
      </div>

      {/* Add a new review */}
      <div className="mt-4">
        <h3 className="text-sm font-semibold">Add Your Review</h3>
        <input
          type="number"
          min="1"
          max="5"
          value={newReview.rating}
          onChange={(e) =>
            setNewReview({
              ...newReview,
              rating: parseInt(e.target.value) || 0,
            })
          }
          placeholder="Rating (1-5)"
          className="border p-1 rounded w-full text-xs mb-2"
        />
        <textarea
          value={newReview.review}
          onChange={(e) =>
            setNewReview({ ...newReview, review: e.target.value })
          }
          placeholder="Write your review..."
          className="border p-1 rounded w-full text-xs"
        />
        <button
          onClick={handleAddReview}
          disabled={loading || !newReview.rating || !newReview.review.trim()}
          className="bg-red text-white px-3 py-1 mt-2 text-xs rounded-2xl disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </div>
    </div>
  );
}

export default EventReview;
