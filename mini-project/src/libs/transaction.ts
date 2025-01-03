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
