"use client";

import { useState, useEffect } from "react";

export default function CountDown({ date }: { date: string }) {
  const [timeLeft, setTimeLeft] = useState<number>(
    new Date(date).getTime() - new Date().getTime()
  );

  useEffect(() => {
    // Recalculate time left when `date` changes
    setTimeLeft(new Date(date).getTime() - new Date().getTime());
  }, [date]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft <= 1000) {
          clearInterval(interval);
          return 0;
        }
        return prevTimeLeft - 1000;
      });
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  return (
    <div className="font-semibold bg-yellow-50 text-center">
      {timeLeft > 0 ? `${minutes}m ${seconds}s` : "Time's up!"}
    </div>
  );
}
