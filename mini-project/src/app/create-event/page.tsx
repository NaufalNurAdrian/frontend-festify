import React from "react";
import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaUpload,
} from "react-icons/fa";

const EventUploadPage: React.FC = () => {
  return (
    <div className="py-24 bg-gray-100 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-md w-full max-w-4xl">
        <div className="relative bg-gray-200 rounded-t-lg h-80 flex justify-center items-center">
          <div className="text-center">
            <div className="flex justify-center items-center mb-2">
              <FaUpload size={32} className="text-gray-500" />
            </div>
            <p className="text-gray-600 font-medium">
              Unggah gambar/poster/banner
            </p>
            <p className="text-sm text-gray-400">
              Direkomendasikan 724 x 340px dan tidak lebih dari 2Mb
            </p>
          </div>
        </div>

        <div className="p-8">
          <div className="mb-4">
            <label
              htmlFor="eventName"
              className="block text-sm font-medium text-gray-700"
            >
              Event Name :
            </label>
            <input
              id="eventName"
              type="text"
              placeholder="Title"
              className="mt-1 p-2 block w-full border-gray-300 bg-gray-100 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm outline-none"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category :
            </label>
            <select
              id="category"
              className="mt-1 p-2 block w-full border-gray-300 bg-gray-100 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="musik">Music</option>
              <option value="olahraga">Film</option>
              <option value="teater">Sport</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-gray-500 text-sm mb-1">Diselenggarakan Oleh</p>
              <div className="flex items-center gap-2">
                <FaUpload className="text-gray-400" />
                <span className="font-medium">hashfi mawarid</span>
              </div>
            </div>

            <div>
              <p className="text-gray-500 text-sm mb-1">Tanggal & Waktu</p>
              <div className="flex items-center gap-2">
                <FaCalendarAlt className="text-gray-400" />
                <span className="text-gray-700">Pilih Tanggal</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <FaClock className="text-gray-400" />
                <span className="text-gray-700">Pilih Waktu</span>
              </div>
            </div>

            <div>
              <p className="text-gray-500 text-sm mb-1">Lokasi</p>
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-gray-400" />
                <span className="text-gray-700">Pilih Lokasi</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventUploadPage;
