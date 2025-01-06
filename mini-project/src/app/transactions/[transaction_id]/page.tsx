"use client";
import { useEffect, useState } from "react";
import PayButton from "@/components/buttonPayMd";
import CountDown from "@/components/expiredTime";
import { formatDate, formatDateTime } from "@/helpers/formatDate";
import { formatPrice } from "@/helpers/formatPrice";
import {
  getSnapToken,
  getTransactionDetail,
  applyCoupon,
} from "@/libs/transaction";

import Image from "next/image";
import { FaClock } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";

export default function OrderPage({
  params,
}: {
  params: { transaction_id: string };
}) {
  const [transaction, setTransaction] = useState<ITransaction | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [coupons, setCoupons] = useState<
    ITransaction["user"]["coupon"][] | null
  >(null);
  const [selectedCoupon, setSelectedCoupon] = useState<number | null>(null); // State untuk kupon yang dipilih

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedTransaction = await getTransactionDetail(
          params.transaction_id
        );
        console.log("Transaction Data:", fetchedTransaction);
        setTransaction(fetchedTransaction);

        const fetchedToken = await getSnapToken(
          fetchedTransaction.finalPrice,
          +params.transaction_id
        );
        setToken(fetchedToken);

        // Ambil kupon yang tersedia
        setCoupons([fetchedTransaction.user.coupon]);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching transaction or token:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [params.transaction_id]);

  const handleApplyCoupon = async () => {
    if (!selectedCoupon || !transaction) return;

    try {
      // Step 1: Apply the coupon to get the response
      const response = await applyCoupon(
        transaction.transaction_id,
        selectedCoupon.toString()
      );

      if (response.message === "Coupon applied successfully") {
        // Step 2: Find the selected coupon and ensure it’s a percentage
        const coupon = coupons?.find(
          (coupon) => coupon.coupon_id === selectedCoupon
        );

        if (!coupon) {
          alert("Coupon not found");
          return;
        }

        // Step 3: Calculate the discount amount as a percentage of the total price
        const discountAmount =
          (transaction.totalPrice * coupon.discountAmount) / 100;
        const finalPrice = transaction.totalPrice - discountAmount;

        // Step 4: Update the transaction details with the new final price
        const updatedTransaction = await getTransactionDetail(
          params.transaction_id
        );

        // Step 5: Update the state with the new final price after applying the discount
        setTransaction((prevTransaction) => {
          if (!prevTransaction) {
            return {
              ...updatedTransaction,
              finalPrice, // Set the new final price after discount
            };
          }

          return {
            ...prevTransaction,
            finalPrice, // Set the new final price after discount
          };
        });

        alert(
          `Coupon applied successfully! Discount: ${coupon.discountAmount}%`
        );
      }
    } catch (error) {
      alert("Failed to apply coupon. Please try again.");
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="loaderx-wrapper">
        <div className="loaderx"></div>
      </div>
    );
  }

  if (!transaction) {
    return <div>No transaction found.</div>;
  }

  return (
    <main className="container mx-auto w-full flex gap-16 tablet:flex-row flex-col px-4 tablet:px-20 py-4">
      <div className="container mx-auto w-full tablet-[60%] justify-center">
        <h1 className="text-2xl font-semibold my-2">Order Details</h1>
        <div className="relative bg-rose-50 border border-red rounded-lg p-6 mb-6 max-w-5xl mx-auto border-dashed clip-path-notch">
          {/* Informasi Tiket */}
          <div className="py-4 flex flex-col gap-2">
            {transaction.OrderDetail && transaction.OrderDetail.length > 0 ? (
              <>
                <h3 className="font-semibold line-clamp-1 text-lg">
                  {transaction.OrderDetail[0].ticketId.event.title}
                </h3>
                <p className="flex items-center gap-2 text-sm text-gray-700">
                  <SlCalender className="text-lightBlue" />
                  {formatDate(
                    transaction.OrderDetail[0].ticketId.event.startTime
                  )}{" "}
                  -{" "}
                  {formatDate(
                    transaction.OrderDetail[0].ticketId.event.endTime
                  )}
                </p>
                <p className="flex items-center gap-2 text-sm text-gray-700">
                  <FaClock className="text-lightBlue" />
                  {formatDateTime(
                    transaction.OrderDetail[0].ticketId.event.startTime
                  )}{" "}
                  -{" "}
                  {formatDateTime(
                    transaction.OrderDetail[0].ticketId.event.endTime
                  )}
                </p>
                <p className="flex items-center gap-2 text-sm text-gray-700">
                  <FaLocationDot className="text-lightBlue" />
                  {transaction.OrderDetail[0].ticketId.event.location}
                </p>
              </>
            ) : (
              <div>Detail pemesanan tidak ditemukan.</div>
            )}
          </div>

          {/* Tabel Tiket */}
          <table className="w-full mt-4">
            <thead>
              <tr className="border-dashed border-t border-b border-black/50">
                <th className="py-2 text-start">Ticket Types</th>
                <th className="text-end">Price</th>
                <th className="text-end">Total</th>
              </tr>
            </thead>
            <tbody>
              {transaction.OrderDetail && transaction.OrderDetail.length > 0 ? (
                transaction.OrderDetail.map(
                  (ticketTransaction: IOrderDetail, idx: number) => (
                    <tr key={idx}>
                      <td className="text-start flex items-center gap-2 py-2">
                        <Image
                          src="/festify-tickets.png"
                          alt="Icon"
                          width={40}
                          height={40}
                        />
                        <span>
                          {ticketTransaction.ticketId?.type || "Unknown Type"}
                        </span>
                      </td>
                      <td className="text-end">
                        {formatPrice(ticketTransaction.ticketId?.price || 0)}
                      </td>
                      <td className="text-end">
                        x{ticketTransaction.qty || 0}
                      </td>
                    </tr>
                  )
                )
              ) : (
                <tr>
                  <td colSpan={3} className="text-center py-2">
                    No tickets available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex flex-col rounded-2xl shadow-xl py-6 px-4 tablet:w-[40%] gap-2 border bg-white">
        <div className="flex items-center justify-end">
          <CountDown date={transaction.expiredAt} />
        </div>

        <h1 className="text-2xl font-semibold mb-2">Price Details</h1>
        <div className="flex justify-between items-center">
          <span>Total Ticket Price</span>{" "}
          <span>{formatPrice(transaction.totalPrice)}</span>
        </div>
        {coupons && coupons.length > 0 && (
          <div className="flex flex-col gap-2 mt-4">
            <label htmlFor="coupon" className="font-semibold">
              Select Coupon
            </label>
            <select
              id="coupon"
              className="border rounded-2xl px-2 py-1"
              value={selectedCoupon || ""}
              onChange={(e) => setSelectedCoupon(Number(e.target.value))}
            >
              <option value="">No Coupon</option>
              {coupons.map((coupon) => (
                <option key={coupon.coupon_id} value={coupon.coupon_id}>
                  Use Refferal Discount {coupon.discountAmount}% - Expires:{" "}
                  {formatDate(coupon.expiresAt)}
                </option>
              ))}
            </select>
            <button
              onClick={handleApplyCoupon}
              className="bg-red text-white px-4 py-2 rounded-2xl mt-2 w-[15%]"
            >
              Apply Coupon
            </button>
          </div>
        )}
        <div className="flex justify-between items-center font-semibold text-xl border-t border-b border-dashed py-2">
          <span>Total Pay</span>{" "}
          <span>{formatPrice(transaction.finalPrice)}</span>
        </div>
        <div className="flex justify-center items-center">
          {token && <PayButton token={token} />}
        </div>
      </div>
    </main>
  );
}
