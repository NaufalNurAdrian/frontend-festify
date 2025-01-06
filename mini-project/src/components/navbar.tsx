"use client";
import { useState } from "react";
import Link from "next/link";
import { RxHamburgerMenu } from "react-icons/rx";
import SearchBar from "./searchbar";
import { TbFilter } from "react-icons/tb";
import { Avatar } from "./avatar";
import { ToastContainer } from "react-toastify";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-2xl">
      <div className="container mx-auto flex items-center justify-between py-3 px-4">
        {/* logo dan search Bar */}
        <div className="flex items-center space-x-4 w-full lg:w-auto">
          <Link href="/">
            <div className="text-red font-bold text-3xl">Festify.</div>
          </Link>
          {/* kolom search desktop */}
          <SearchBar />
        </div>

        {/* navigation */}
        <div className=" hidden lg:flex items-center space-x-6 text-sm text-gray-700 md:ml-4">
          <Link
            href="/create-event"
            className="hover:text-gray-900 whitespace-nowrap "
          >
            Create Events
          </Link>
          <Link href="/event" className="hover:text-gray-900">
            Explore
          </Link>
          <Avatar />
        </div>

        {/* hamburger menu dimobile */}
        <div className="lg:hidden flex items-center space-x-4">
          <SearchBar isMobile />

          <button onClick={() => setMenuOpen(true)} className="text-lg">
            <RxHamburgerMenu />
          </button>
        </div>
      </div>

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
                  href="/login" //link page login
                  className="rounded-full border px-4 py-1 border-black hover:bg-red hover:text-white hover:border-red"
                >
                  Log In
                </Link>
                <Link
                  href="/signup" // link page sign up
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
                  href="/create-event"
                  className="text-sm text-gray-700 hover:text-gray-900 py-2 text-start"
                >
                  Explore
                </Link>
              </div>
            </div>
          </div>
          <ToastContainer
            position="top-center"
            autoClose={3000}
            className="absolute"
          />
        </div>
      )}
    </header>
  );
}
