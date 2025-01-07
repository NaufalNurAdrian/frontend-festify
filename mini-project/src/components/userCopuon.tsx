"use client";

import { useEffect, useState } from "react";
import axios from "axios";

type Coupon = {
  discountAmount: number;
  expiresAt: string;
};

export default function UserCoupon() {
  const [coupon, setCoupon] = useState<Coupon | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const base_url = process.env.NEXT_PUBLIC_BASE_URL_BE;

  useEffect(() => {
    const fetchCoupon = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found. Please log in.");
        }

        const response = await axios.get<{ coupon: Coupon | null }>(
          `${base_url}/users/coupon`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.data.coupon) {
          setCoupon(response.data.coupon);
        }
      } catch (err) {
        console.error("Error fetching coupon:", err);
        setError("Failed to fetch coupon data");
      } finally {
        setLoading(false);
      }
    };

    fetchCoupon();
  }, []);

  if (loading) {
    return <p>Loading coupon data...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Your Coupon</h2>
      {coupon ? (
        <div className="text-center">
          <p className="text-xl font-bold text-red-600">
            {coupon.discountAmount}% Discount
          </p>
          <p className="text-gray-600">
            Expires on:{" "}
            <span className="font-medium">
              {new Date(coupon.expiresAt).toLocaleDateString()}
            </span>
          </p>
        </div>
      ) : (
        <p className="text-gray-600">No active coupons available.</p>
      )}
    </div>
  );
}
