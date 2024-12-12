"use client";
import { useState } from "react";
import Link from "next/link";
import { FiSearch } from "react-icons/fi";
import { RxHamburgerMenu } from "react-icons/rx";
import { TbFilter } from "react-icons/tb";
import { Avatar } from "./avatar";

export default function Navbar() {
  const [searchVisible, setSearchVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // function buat klik di luar kolom search ke close
  const handleSearchClickOutside = (e: React.MouseEvent) => {
    const searchModal = document.getElementById("search-modal");
    if (searchModal && !searchModal.contains(e.target as Node)) {
      setSearchVisible(false);
    }
  };

  return (
    <header className="bg-white shadow-2xl">
      <div className="container mx-auto flex items-center justify-between py-3 px-4">
        {/* logo dan search Bar */}
        <div className="flex items-center space-x-4 w-full lg:w-auto">
          <div className="text-red font-bold text-3xl">Festify.</div>

          {/* kolom search desktop */}
          <div className="hidden lg:flex items-center bg-gray-100 rounded-full shadow-sm p-2 w-full md:w-[500px]">
            <div className="flex items-center px-4 w-full">
              <input
                type="text"
                placeholder="Search events"
                className="bg-transparent outline-none px-2 text-sm w-full"
              />
            </div>
            <div className="space-x-2 flex">
              <button className="bg-red rounded-full px-4 py-1 text-white text-sm">
                <FiSearch />
              </button>

              <button className="bg-red rounded-full px-4 py-1 text-white text-sm">
                <TbFilter />
              </button>
            </div>
          </div>
        </div>

        {/* navigation */}
        <div className=" hidden lg:flex items-center space-x-6 text-sm text-gray-700 md:ml-4">
          <Link href="#" className="hover:text-gray-900 whitespace-nowrap ">
            Create Events
          </Link>
          <Link href="#" className="hover:text-gray-900">
            Explore
          </Link>
          <Avatar />
        </div>

        {/* hamburger menu dimobile */}
        <div className="lg:hidden flex items-center space-x-4">
          <button onClick={() => setSearchVisible(true)} className="text-lg">
            <FiSearch />
          </button>
          <button onClick={() => setMenuOpen(true)} className="text-lg">
            <RxHamburgerMenu />
          </button>
        </div>
      </div>

      {/*  mobile */}
      {searchVisible && (
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50 flex justify-center items-start pt-4"
          onClick={handleSearchClickOutside} // Nutup jika klik di luar
        >
          <div
            id="search-modal"
            className="bg-white p-4 rounded-2xl w-full max-w-lg mx-2"
            onClick={(e) => e.stopPropagation()} // biar modal ganutup jika klik di dalam
          >
            <div className="flex items-center">
              <input
                type="text"
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
          </div>
        </div>
      )}

      {/* untuk menu navigasi di mobile  */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-50 z-40 pt-4"
          onClick={() => setMenuOpen(false)} // Nutup jika klik di luar
        >
          <div className="bg-white p-4 rounded-lg w-full max-w-md mx-auto py-2 text-center ">
            <div className="space-y-4">
              <div className="flex flex-col space-y-2 py-2">
                <Link
                  href="#" //link page login
                  className="rounded-full border px-4 py-1 border-black hover:bg-red hover:text-white hover:border-red"
                >
                  Log In
                </Link>
                <Link
                  href="#" // link page sign up
                  className="bg-red text-white px-4 py-1 rounded-full hover:bg-codgray"
                >
                  Sign Up
                </Link>
              </div>
              <div className="flex flex-col space-y-2 mt-4">
                <Link
                  href="#"
                  className="text-sm text-gray-700 hover:text-gray-900 py-2 text-start"
                >
                  Create Event
                </Link>
                <Link
                  href="#"
                  className="text-sm text-gray-700 hover:text-gray-900 py-2 text-start"
                >
                  Explore
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
