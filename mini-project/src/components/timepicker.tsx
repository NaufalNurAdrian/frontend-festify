import React, { useState } from "react";
import { FaClock } from "react-icons/fa"; // Icon untuk clock

const TimeRangePicker: React.FC = () => {
  // State untuk waktu start dan end
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false); // Menangani status pop-up

  // Fungsi untuk menangani perubahan waktu start
  const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartTime(e.target.value);
  };

  // Fungsi untuk menangani perubahan waktu end
  const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndTime(e.target.value);
  };

  // Fungsi untuk membuka/tutup pop-up
  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  // Menggabungkan startTime dan endTime untuk ditampilkan di input utama
  const combinedTime = startTime && endTime ? `${startTime} - ${endTime}` : "";

  return (
    <div className="relative">
      {/* Input utama untuk menampilkan startTime dan endTime */}
      <div
        className="flex items-center gap-2 mt-2 cursor-pointer "
        onClick={togglePopup}
      >
        <FaClock className="text-gray-600 flex flex-row items-center" />
        <input
          type="text"
          placeholder="Start Time ~ End Time"
          value={combinedTime}
          readOnly
          className="w-full p-2 rounded-md bg-gray-100 cursor-pointer flex-row text-sm outline-red"
        />
      </div>

      {/* Pop-up untuk memilih waktu */}
      {isPopupOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Select Time Range</h2>

            {/* Input untuk start time */}
            <div className="mb-4">
              <label className="block text-gray-600 mb-2">Start Time</label>
              <input
                type="time"
                value={startTime}
                onChange={handleStartTimeChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            {/* Input untuk end time */}
            <div className="mb-4">
              <label className="block text-gray-600 mb-2">End Time</label>
              <input
                type="time"
                value={endTime}
                onChange={handleEndTimeChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            {/* Tombol untuk menyimpan dan menutup pop-up */}
            <div className="flex justify-between">
              <button
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md"
                onClick={togglePopup} // Menutup pop-up
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red text-white rounded-md"
                onClick={togglePopup} // Menutup pop-up setelah menyimpan
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeRangePicker;
