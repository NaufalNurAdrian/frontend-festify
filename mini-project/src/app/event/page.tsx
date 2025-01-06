"use client";

import React, { useEffect, useState } from "react";
import EventCard from "@/components/cardevent";
import { getEvent } from "@/libs/events";
import {
  FaFilter,
  FaSortAmountDown,
  FaSortAmountUp,
  FaTimes,
} from "react-icons/fa";
import { useRouter, useSearchParams } from "next/navigation";

interface Ticket {
  price: number;
}

interface Organizer {
  username: string;
  avatar: string;
}

interface Event {
  title: string;
  thumbnail: string;
  slug: string;
  description: string;
  category: string;
  location: string;
  organizer: Organizer;
  Ticket?: Ticket[]; // Optional array of tickets
}

const EVENTS_PER_PAGE = 8;

export default function EventList() {
  const [events, setEvents] = useState<Event[]>([]);
  const [filterCategory, setFilterCategory] = useState<string>("All");
  const [sortOption, setSortOption] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false); // For mobile sidebar toggle
  const [currentPage, setCurrentPage] = useState<number>(1);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: Event[] = await getEvent();
        console.log("Fetched data (EventList):", data);
        setEvents(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filterFromUrl = searchParams.get("category");
    if (filterFromUrl) {
      setFilterCategory(filterFromUrl); // Set the filter category based on the URL query
    }
  }, [searchParams]);

  // Filter events based on category
  const filteredEvents = events.filter((event) => {
    const category = event.category?.toLowerCase() || "";
    const filter = filterCategory.toLowerCase();
    return filterCategory === "All" || category === filter;
  });

  // Sort events based on price
  const sortedEvents = filteredEvents.sort((a, b) => {
    const aPrice = Math.min(
      ...(a.Ticket?.map((ticket) => ticket.price) || [0])
    );
    const bPrice = Math.min(
      ...(b.Ticket?.map((ticket) => ticket.price) || [0])
    );
    if (sortOption === "price-lowest") return aPrice - bPrice;
    if (sortOption === "price-highest") return bPrice - aPrice;
    return 0; // No sorting if no option selected
  });

  // Paginate events
  const paginatedEvents = sortedEvents.slice(
    (currentPage - 1) * EVENTS_PER_PAGE,
    currentPage * EVENTS_PER_PAGE
  );

  // Handle filter change
  const handleFilterChange = (category: string) => {
    setFilterCategory(category);
    // Update the URL with the selected category as a query parameter without navigating
    router.replace(`/event?category=${category}`);
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(sortedEvents.length / EVENTS_PER_PAGE);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Sidebar - Filter */}
      <aside
        className={`fixed lg:static top-0 left-0 min-h-screen z-20 w-full lg:w-1/5 bg-gray-50 border-r border-gray-200 p-6 rounded-2xl transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } transition-transform lg:transition-none`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <FaFilter className="text-red" />
            Filter
          </h2>
          <button
            className="lg:hidden text-gray-500 hover:text-red"
            onClick={() => setIsSidebarOpen(false)}
          >
            <FaTimes size={20} />
          </button>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            className="block w-full border-gray-300 rounded-lg p-3 bg-white shadow-sm"
            value={filterCategory}
            onChange={(e) => handleFilterChange(e.target.value)}
          >
            <option value="All">All Category</option>
            <option value="MUSIC">MUSIC</option>
            <option value="FILM">FILM</option>
            <option value="EDUCATION">EDUCATION</option>
            <option value="SPORT">SPORT</option>
          </select>
        </div>
      </aside>

      {/* Main Content - Event List */}
      <main className="flex-1 p-4 lg:p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Event List</h2>
          <div className="flex items-center gap-4">
            <button
              className="block lg:hidden p-2 border rounded-xl bg-red text-white"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              {isSidebarOpen ? "Close" : "Filter"}
            </button>
            <div className="relative">
              <select
                className="border-gray-300 rounded-lg p-2 bg-white shadow-sm px-6"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="">Sort by Price</option>
                <option value="price-highest">Highest Price</option>
                <option value="price-lowest">Lowest Price</option>
              </select>
              <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500">
                {sortOption === "price-lowest" ? (
                  <FaSortAmountDown />
                ) : sortOption === "price-highest" ? (
                  <FaSortAmountUp />
                ) : (
                  <FaSortAmountDown />
                )}
              </div>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Menampilkan skeleton sesuai dengan jumlah event yang ada */}
            {Array.from({ length: Math.max(events.length, 8) }).map(
              (_, idx) => (
                <div key={idx}>
                  <EventCard isLoading />
                </div>
              )
            )}
          </div>
        ) : paginatedEvents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {paginatedEvents.map((item, idx) => (
              <div key={idx}>
                <EventCard
                  thumbnail={item.thumbnail}
                  title={item.title}
                  avatar={item.organizer?.avatar || ""}
                  description={item.description}
                  slug={item.slug}
                  username={item.organizer?.username || "Unknown"}
                  location={item.location}
                  price={Math.min(
                    ...(item.Ticket?.map((ticket) => ticket.price) ?? [0])
                  )}
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No Event Found.</p>
        )}

        {/* Pagination */}
        <div className="flex justify-center items-center gap-4 mt-6 mb-8">
          <button
            className="px-4 py-2 bg-gray-200 rounded-md hover:bg-codgray hover:text-white"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="px-4 py-2 bg-gray-200 rounded-md hover:bg-codgray hover:text-white"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
}
