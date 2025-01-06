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
        "/transactions/applyCoupon", // Ganti dengan URL API yang sesuai
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
      return data; // Kembalikan data dari server, bisa berupa success message atau data lainnya
    }
  } catch (err) {
    console.error("Error applying coupon:", err);
    throw err; // Lempar error ke komponen yang memanggil untuk menangani error
  }
}

export async function getCouponDetails(token: string) {
  try {
    const { data } = await axios.get(`/users/profle/coupon`, {
      headers: {
        Authorization: `Bearer ${token}`, // Token digunakan untuk autentikasi
      },
    });

    console.log("Coupon details:", data);
    return data?.coupon; // Mengembalikan data kupon
  } catch (err) {
    console.error("Error fetching coupon details:", err);
    return null; // Jika terjadi error, kembalikan null
  }
}
