"use client";

import Link from "next/link";
import { BiHome } from "react-icons/bi";
import { LuTicket } from "react-icons/lu";
import { IoCreateOutline } from "react-icons/io5";
import { ImProfile } from "react-icons/im";
import { RiSettings4Line } from "react-icons/ri";
import { useState, useEffect } from "react";

export default function Sidebar() {
  const [role, setRole] = useState("CUSTOMER"); // Nilai awal default

  // Mengambil role dari localStorage hanya di sisi klien
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedRole = localStorage.getItem("role");
      if (savedRole) {
        setRole(savedRole);
      }
    }
  }, []);

  return (
    <div className="bg-codgray text-white rounded-r-xl h-screen w-52 p-2 hidden lg:block fixed">
      <div className="flex justify-center text-3xl font-extrabold mb-8 text-red mt-2">
        <Link href="/">Festify.</Link>
      </div>
      <div className="flex flex-col gap-5 mt-10 font-normal">
        {role === "ORGANIZER" && (
          <div className="flex flex-col gap-5">
            <Link href="/dashboard" className="hover:text-white">
              <div className="flex p-2 items-center rounded-md h-8 hover:bg-slate-800 gap-5">
                <BiHome /> Dashboard
              </div>
            </Link>
            <Link href="/dashboard/myevent" className="hover:text-white">
              <div className="flex p-2 items-center rounded-md h-8 hover:bg-slate-800 gap-5">
                <LuTicket /> My Event
              </div>
            </Link>
            <Link href="/dashboard/gatein" className="hover:text-white">
              <div className="flex p-2 items-center rounded-md h-8 hover:bg-slate-800 gap-5">
                <LuTicket /> Scan Ticket
              </div>
            </Link>
            <Link href="/dashboard/create" className="hover:text-white">
              <div className="flex p-2 items-center rounded-md h-8 hover:bg-slate-800 gap-5">
                <IoCreateOutline /> Create Event
              </div>
            </Link>
          </div>
        )}
        {role === "CUSTOMER" && (
          <div>
            <Link href="/dashboard/myticket" className="hover:text-white">
              <div className="flex p-2 items-center rounded-md h-8 hover:bg-slate-800 gap-5">
                <LuTicket /> My Ticket
              </div>
            </Link>
          </div>
        )}
        <Link href="/dashboard/profile" className="hover:text-white">
          <div className="flex p-2 items-center rounded-md h-8 hover:bg-slate-800 gap-5">
            <ImProfile /> Profile
          </div>
        </Link>
        <Link href="/dashboard/settings" className="hover:text-white">
          <div className="flex p-2 items-center rounded-md h-8 hover:bg-slate-800 gap-5">
            <RiSettings4Line /> Settings
          </div>
        </Link>
        <Link href="/dashboard/accounts" className="hover:text-white">
          <div className="flex p-2 items-center rounded-md h-8 hover:bg-slate-800 gap-5">
            Informasi Legal
          </div>
        </Link>
      </div>
    </div>
  );
}
