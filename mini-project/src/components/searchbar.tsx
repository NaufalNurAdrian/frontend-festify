"use client";

import { IEvent } from "@/types/event";

import React, { useCallback, useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useDebounce } from "use-debounce";
import { formatDate } from "@/helpers/formatDate";
import Link from "next/link";

interface SearchBarProps {
  isMobile?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ isMobile = false }) => {
  const base_url = process.env.NEXT_PUBLIC_BASE_URL_BE;

  const [searchVisible, setSearchVisible] = useState(false);
  const [events, setEvents] = useState<IEvent[]>([]);
  const [value, setValue] = useState<string>("");
  const [text] = useDebounce(value, 500);
  const [isLoading, setIsloading] = useState<boolean>(false);

  const getData = async () => {
    try {
      setIsloading(true);
      const res = await fetch(`${base_url}/event?search=${text}`);
      const result = await res.json();
      setEvents(result.events);
    } catch (err) {
      console.log(err);
    } finally {
      setIsloading(false);
    }
  };

  const updateUrl = useCallback((keyword: string) => {
    const params = new URLSearchParams(window.location.search);
    if (keyword) {
      params.set("keyword", keyword);
    } else {
      params.delete("keyword");
    }
    // Mengubah URL tanpa reload halaman menggunakan pushState
    window.history.pushState(null, "", "?" + params.toString());
  }, []);

  useEffect(() => {
    // Memanggil fungsi untuk mengambil data berdasarkan pencarian
    getData();
    // Update URL setiap kali `text` berubah
    updateUrl(text);
  }, [text]);

  // Fungsi untuk menutup modal search jika klik di luar modal
  const handleSearchClickOutside = (e: React.MouseEvent) => {
    const searchModal = document.getElementById("search-modal");
    if (searchModal && !searchModal.contains(e.target as Node)) {
      setSearchVisible(false);
    }
  };

  // Tampilan mobile
  if (isMobile) {
    return (
      <>
        <button onClick={() => setSearchVisible(true)} className="text-lg">
          <FiSearch />
        </button>

        {/* Modal Search Mobile */}
        {searchVisible && (
          <div
            className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50 flex justify-center items-start pt-4"
            onClick={handleSearchClickOutside}
          >
            <div
              id="search-modal"
              className="bg-white p-4 rounded-2xl w-full max-w-lg mx-2"
              onClick={(e) => e.stopPropagation()} // Biar modal tidak menutup jika klik di dalam
            >
              <div className="flex items-center">
                <input
                  type="search"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="Search events"
                  className="bg-transparent outline-none px-4 py-2 text-sm w-full"
                />

                <button
                  className="bg-red rounded-full px-4 py-1 text-white text-sm"
                  onClick={() => setSearchVisible(false)}
                >
                  <FiSearch />
                </button>
              </div>

              {/* Tampilkan hasil hanya jika ada input dan sedang tidak loading */}
              {value.length > 0 && (
                <>
                  {isLoading ? (
                    <div>Loading...</div>
                  ) : events.length === 0 ? (
                    <div>Not found</div>
                  ) : (
                    <ul className="absolute z-10 w-96 bg-white mt-2 rounded-md shadow-lg">
                      {events.map((item, idx) => (
                        <li
                          key={idx}
                          data-cy="event-item"
                          className="p-2 hover:bg-gray-100"
                        >
                          {item.title}
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </>
    );
  }

  // Tampilan desktop
  return (
    <div className="hidden lg:flex items-center bg-gray-100 rounded-full shadow-sm p-2 w-full md:w-[500px]">
      <div className="flex items-center px-4 w-full">
        <input
          type="search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search events"
          className="bg-transparent outline-none px-2 text-sm w-full"
        />
      </div>

      {value.length > 0 && (
        <>
          {isLoading ? (
            <div className="loader"></div>
          ) : events.length === 0 ? (
            <ul className="absolute z-10 w-96 bg-white mt-28 opacity-80 rounded-md shadow-lg ">
              <li className="p-4 hover:bg-gray-200 rounded-md opacity-100 ">
                Not found
              </li>
            </ul>
          ) : (
            <ul className="absolute z-10 w-96 bg-white opacity-90 rounded-md shadow-lg top-14 ">
              {events.map((item, idx) => (
                <li
                  key={idx}
                  data-cy="blog-item"
                  className="p-2 hover:bg-gray-200 rounded-md flex gap-4 items-start py-3"
                >
                  <img
                    src={item.thumbnail}
                    alt="xx"
                    width={100}
                    height={100}
                    className="rounded-md "
                  />
                  <Link href={`/event/${item.slug}`}>
                    <div className="flex flex-col justify-start">
                      <p className="font-medium">{item.title}</p>
                      <p className="font-light text-sm text-gray-500">
                        {formatDate(item.startTime)}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
      <div className="space-x-2 pl-5 flex">
        <button className="bg-red rounded-full px-4 py-1 text-white text-sm">
          <FiSearch />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
