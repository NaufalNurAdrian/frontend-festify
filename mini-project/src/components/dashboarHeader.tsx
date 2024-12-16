"use client"
import { useState } from "react";
import BurgerSidebar from "./burgerSidebar";
import { CgMenuLeftAlt } from "react-icons/cg";
import { Avatar } from "./avatar";

export default function DashboardHeader () {
  const [setSidebar, setIsSidebarOpen] = useState<boolean>(false)
  const toogleSidebar = () => {
    setIsSidebarOpen(!setSidebar)
  }
    return (
      <div className="bg-white shadow-md p-4 flex justify-between items-center w-full">
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
          <Avatar/>
        </div>
      </div>
    );
  };