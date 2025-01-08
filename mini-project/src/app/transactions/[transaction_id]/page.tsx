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
import authGuard from "@/hoc/authGuard";
import { IOrderDetail, ITransaction } from "@/types/transaction";
import { Slide, toast } from "react-toastify";
import { useRouter } from "next/navigation";

function OrderPage({ params }: { params: { transaction_id: string } }) {
  const [transaction, setTransaction] = useState<ITransaction | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [coupons, setCoupons] = useState<
    ITransaction["user"]["coupon"][] | null
  >(null);
  const [selectedCoupon, setSelectedCoupon] = useState<number | null>(null);
  const router = useRouter();

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
      const response = await applyCoupon(
        transaction.transaction_id,
        selectedCoupon.toString()
      );
  
      if (response.message === "Coupon applied successfully") {
        const coupon = coupons?.find(
          (coupon) => coupon.coupon_id === selectedCoupon
        );
  
        if (!coupon) {
          alert("Coupon not found");
          return;
        }
  
        const discountAmount =
          (transaction.totalPrice * coupon.discountAmount) / 100;
        const finalPrice = transaction.totalPrice - discountAmount;
  
        const updatedTransaction = await getTransactionDetail(
          params.transaction_id
        );
  
        setTransaction((prevTransaction) => {
          if (!prevTransaction) {
            return {
              ...updatedTransaction,
              finalPrice,
            };
          }
  
          return {
            ...prevTransaction,
            finalPrice,
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
  
  // const handleApplyPoint = async () => {
  //   if (!selectedPoint || !transaction) return;
  
  //   try {
  //     const pointValue = selectedPoint;
  
  //     if (!pointValue) {
  //       alert("Point not valid");
  //       return;
  //     }
  
  //     const finalPrice = transaction.totalPrice - pointValue;
  
  //     const updatedTransaction = await getTransactionDetail(
  //       params.transaction_id
  //     );
  
  //     setTransaction((prevTransaction) => {
  //       if (!prevTransaction) {
  //         return {
  //           ...updatedTransaction,
  //           finalPrice,
  //         };
  //       }
  
  //       return {
  //         ...prevTransaction,
  //         finalPrice,
  //       };
  //     });
  
  //     alert(`Point applied successfully! Discount: ${pointValue}`);
  //   } catch (error) {
  //     alert("Failed to apply point. Please try again.");
  //     console.error(error);
  //   }
  // };
  

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

  // Menghitung Total Harga Tiket
  const totalTicketPrice = transaction.OrderDetail.reduce(
    (sum, ticket) => sum + ticket.ticketId.price * ticket.qty,
    0
  );

  // Menghitung Final Price jika ada Diskon
  const finalPrice = selectedCoupon
    ? totalTicketPrice -
      (totalTicketPrice * (coupons?.[0]?.discountAmount || 0)) / 100
    : totalTicketPrice;

  return (
    <main className="container mx-auto w-full flex gap-16 tablet:flex-row flex-col px-4 tablet:px-20 py-4">
      <div className="container mx-auto w-full tablet-[60%] justify-center">
        <h1 className="text-2xl font-semibold my-2">Order Details</h1>
        <div className="relative bg-rose-50 border border-red rounded-lg p-6 mb-6 max-w-5xl mx-auto border-dashed clip-path-notch">
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
          <span>Total Ticket Price</span>
          <span>{formatPrice(totalTicketPrice)}</span>
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
              {coupons?.map((coupon) => (
                <option
                  key={coupon?.coupon_id}
                  value={coupon?.coupon_id}
                  disabled={
                    !coupon || coupon.expiresAt < new Date().toISOString()
                  } // Disable jika Used === true
                >
                  {coupon?.used ? "Already Used - " : ""}
                  Refferal Discount {coupon?.discountAmount}% - Expires:{" "}
                  {formatDate(coupon?.expiresAt)}
                </option>
              ))}
            </select>
            <button
              onClick={handleApplyCoupon}
              className="bg-red text-white px-4 py-2 rounded-2xl mt-2 w-[15%]"
              disabled={!selectedCoupon} // Tombol disable jika tidak ada kupon dipilih
            >
              Apply Coupon
            </button>
          </div>
        )}
        <div className="flex justify-between items-center font-semibold text-xl border-t border-b border-dashed py-2">
          <span>Total Pay</span>
          <span>{formatPrice(finalPrice)}</span>
        </div>
        <div className="flex justify-center items-center">
          {transaction.OrderDetail.every(
            (detail) => detail.ticketId.type === "FREE"
          ) ? (
            <button
              className="bg-red text-white py-2 px-4 rounded hover:bg-red transition"
              onClick={() => {
                toast.success("You have successfully ordered free tickets!", {
                  hideProgressBar: true,
                  transition: Slide,
                });
                router.push("/dashboard/myticket");
              }}
            >
              Get Free Tickets
            </button>
          ) : (
            token && <PayButton token={token} />
          )}
        </div>
      </div>
    </main>
  );
}

export default authGuard(OrderPage);
