"use client";

import React, { useEffect, useState } from "react";

export default function DashboardData() {
  const [activeEvent, setActiveEvent] = useState<number>(0);
  const [deactiveEvent, setDeactiveEvent] = useState<number>(0);
  const [totalTransaction, setTotalTransaction] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);

        // User ID bisa diubah sesuai kebutuhan atau diambil dari context/auth
        const userId = 2;

        const [activeEventRes, deactiveEventRes, totalTransactionRes] = await Promise.all([
          fetch(`http://localhost:8000/api/dashboard/event-active/${userId}`),
          fetch(`http://localhost:8000/api/dashboard/event-deactive/${userId}`),
          fetch(`http://localhost:8000/api/dashboard/event-transaction/${userId}`),
        ]);

        if (!activeEventRes.ok || !deactiveEventRes.ok || !totalTransactionRes.ok) {
          throw new Error("Failed to fetch dashboard data");
        }

        const activeEventData = await activeEventRes.json();
        const deactiveEventData = await deactiveEventRes.json();
        const totalTransactionData = await totalTransactionRes.json();

        setActiveEvent(activeEventData.activeEvent);
        setDeactiveEvent(deactiveEventData.deactiveEvent);
        setTotalTransaction(totalTransactionData.totalTransaction);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

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

