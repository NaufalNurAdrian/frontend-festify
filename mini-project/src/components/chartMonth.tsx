"use client";

import React, { useEffect, useState } from "react";
import { LineChart, lineElementClasses } from "@mui/x-charts/LineChart";
import axios from "axios";

// Define the type of API response
type IncomeData = {
  month: string; // Format: YYYY-MM
  totalIncome: number;
};

type ApiResponse = {
  incomePerMonth: IncomeData[];
};

export default function IncomePerMonthChart() {
  const [uData, setUData] = useState<number[]>([]);
  const [xLabels, setXLabels] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchIncomeData = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found. Please log in.");
        }

        const response = await axios.get<ApiResponse>(
          `${process.env.NEXT_PUBLIC_BASE_URL_BE}/dashboard/payments/total-income/month`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const incomeData = response.data.incomePerMonth;
        const labels = incomeData.map((item) => item.month); // x-axis: Month (YYYY-MM)
        const data = incomeData.map((item) => item.totalIncome); // y-axis: Total Income

        setXLabels(labels);
        setUData(data);
      } catch (err) {
        console.error("Error fetching income data:", err);
        setError("Failed to fetch income data");
      } finally {
        setLoading(false);
      }
    };

    fetchIncomeData();
  }, []);

  if (loading) {
    return <p>Loading chart data...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <LineChart
      className="p-5"
      width={600}
      height={300}
      series={[{ data: uData, label: "Income", area: true, showMark: false }]}
      xAxis={[{ scaleType: "point", data: xLabels }]}
      sx={{
        [`& .${lineElementClasses.root}`]: {
          display: "none",
        },
      }}
    />
  );
}
