"use client"
import { useState } from "react";
import BurgerSidebar from "./burgerSidebar";
import { CgMenuLeftAlt } from "react-icons/cg";

export default function DashboardHeader () {
  const [setSidebar, setIsSidebarOpen] = useState<boolean>(false)
  const toogleSidebar = () => {
    setIsSidebarOpen(!setSidebar)
  }
    return (
      <div className="bg-white shadow-md p-4 flex flex-wrap justify-between items-center">
        <div className="lg:hidden block">
          <button onClick={toogleSidebar}>
          <BurgerSidebar isMenuOpen={setSidebar}  toggleMenu={toogleSidebar}/>
          <CgMenuLeftAlt/>
          </button>
        </div>
        <div>
        <h2 className="text-lg font-bold sm:text-xl">Home</h2>
        </div>
        <div className="flex gap-4 flex-wrap mt-2 sm:mt-0">
          <button className="border border-black px-4 py-2 rounded-lg hover:bg-gray-100 transition sm:w-auto w-full hidden lg:block">
            Buat Event
          </button>
          <button className="border shadow-md px-4 py-2 rounded-3xl w-full sm:w-40 lg:w-52 hover:bg-gray-50 transition">
            Login
          </button>
        </div>
      </div>
    );
  };