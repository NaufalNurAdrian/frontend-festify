"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "@/components/context/useSession";

export default function DashboardData() {
  const { isAuth, user } = useSession();
  const [activeEvent, setActiveEvent] = useState<number>(0);
  const [deactiveEvent, setDeactiveEvent] = useState<number>(0);
  const [totalTransaction, setTotalTransaction] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuth || !user) {
      setError("User not authenticated. Please log in.");
      setLoading(false);
      return;
    }

    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found. Please log in.");
        }

        const [activeEventRes, deactiveEventRes, totalTransactionRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_BASE_URL_BE}/dashboard/event-active`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${process.env.NEXT_PUBLIC_BASE_URL_BE}/dashboard/event-deactive`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${process.env.NEXT_PUBLIC_BASE_URL_BE}/dashboard/event-transaction`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        if (!activeEventRes.ok || !deactiveEventRes.ok || !totalTransactionRes.ok) {
          throw new Error("Failed to fetch dashboard data.");
        }

        const activeEventData = await activeEventRes.json();
        const deactiveEventData = await deactiveEventRes.json();
        const totalTransactionData = await totalTransactionRes.json();

        setActiveEvent(activeEventData.activeEvent || 0);
        setDeactiveEvent(deactiveEventData.deactiveEvent || 0);
        setTotalTransaction(totalTransactionData.totalTransaction || 0);
      } catch (err: any) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [isAuth, user]);

  if (loading) {
    return <div className="p-5 text-center">Loading...</div>;
  }

  if (error) {
    return (
      <div className="p-5 text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 p-5">
      {/* Event Aktif */}
      <div className="bg-white shadow p-4 rounded">
        <h3 className="font-bold text-lg">Event Aktif</h3>
        <p>{activeEvent} Event</p>
      </div>

      {/* Event Lalu */}
      <div className="bg-white shadow p-4 rounded">
        <h3 className="font-bold text-lg">Event Lalu</h3>
        <p>{deactiveEvent} Event</p>
      </div>

      {/* Total Transaksi */}
      <div className="bg-white shadow p-4 rounded">
        <h3 className="font-bold text-lg">Total Transaksi</h3>
        <p>Rp {totalTransaction}</p>
      </div>

      {/* Total Tiket Terjual */}
      <div className="bg-white shadow p-4 rounded">
        <h3 className="font-bold text-lg">Total Tiket Terjual</h3>
        <p>0 Tiket</p>
      </div>

      {/* Total Pengunjung */}
      <div className="bg-white shadow p-4 rounded">
        <h3 className="font-bold text-lg">Total Pengunjung</h3>
        <p>0 Orang</p>
      </div>
    </div>
  );
}
