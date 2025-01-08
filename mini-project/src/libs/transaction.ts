import axios from "@/helpers/axios";

export async function getTransactionDetail(transaction_id: string) {
  try {
    const { data } = await axios.get(`/transactions/${transaction_id}`);
    console.log("API Response:", data);
    return data?.result;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function getSnapToken(finalPrice: number, orderId: number) {
  try {
    if (typeof window !== "undefined") {
      // Delay the execution until client-side
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Token not found in localStorage");
      }

      const { data } = await axios.post(
        "/transactions/payment",
        {
          orderId,
          gross_amount: finalPrice,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data.result;
    }
  } catch (err) {
    console.error("Error in getSnapToken:", err);
    throw err;
  }
}

// Fungsi untuk menerapkan kupon
export async function applyCoupon(transaction_id: string, coupon_id: string) {
  try {
    // Ambil token dari localStorage
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found in localStorage");
      }

      // Kirim request untuk apply coupon
      const { data } = await axios.post(
        "/transactions/applyCoupon",
        {
          transaction_id,
          coupon_id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Coupon applied successfully:", data);
      return data;
    }
  } catch (err) {
    console.error("Error applying coupon:", err);
    throw err;
  }
}

// Fungsi untuk menerapkan poin
export async function applyPoint(transaction_id: string, points: number) {
  try {
    // Ambil token dari localStorage
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found in localStorage");
      }

      // Kirim request untuk apply points
      const { data } = await axios.post(
        "/transactions/applyPoint",
        {
          transaction_id,
          points,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Points applied successfully:", data);
      return data;
    }
  } catch (err) {
    console.error("Error applying points:", err);
    throw err;
  }
}

export async function getCouponDetails(token: string) {
  try {
    const { data } = await axios.get(`/users/profle/coupon`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Coupon details:", data);
    return data?.coupon;
  } catch (err) {
    console.error("Error fetching coupon details:", err);
    return null;
  }
}



