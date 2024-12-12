"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { IUser } from "@/types/user";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const AvatarModal = ({
  user,
  onLogout,
}: {
  user: IUser | null;
  onLogout: () => void;
}) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropdownOpen(false);
    }
  };

  const changeRole = async (role: string) => {
    if (!user) return;
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8000/api/auth/${role.toLowerCase()}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ role: { user_id: user.user_id } }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        location.reload()
        toast.success("Success Change Role");
        router.refresh();
      } else {
        throw new Error(data.message || "Failed to change role");
      }
    } catch (err) {
      console.error(err);
      toast.error("Fail to Change Role");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div ref={dropdownRef} className="relative">
      <div
        onClick={toggleDropdown}
        className="flex items-center cursor-pointer"
      >
        <div className="w-10 h-10 relative">
          <Image
            className="rounded-full object-cover"
            src={user?.avatar || ""}
            alt={user?.username || "author"}
            fill
            priority
          />
        </div>
        <div className="flex-1 min-w-0 ms-2 max-sm:hidden">
          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
            {user?.username}
          </p>
          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
            {user?.email}
          </p>
        </div>
      </div>

      {isDropdownOpen && (
        <div className="container mx-auto flex flex-col absolute right-0 mt-2 w-60 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-10">
          <ul className="py-1">
            <li>
              <div className="flex flex-col gap-2 font-normal justify-center pt-2 pb-5">
                {user?.role === "CUSTOMER" && (
                  <div>
                    <div className="flex justify-center text-xs font-semibold">
                      Change Account
                    </div>
                    <div className="flex justify-center gap-2 mt-2">
                      <button className="border border-codgray w-24 h-7 text-white rounded-md bg-red">
                        user
                      </button>
                      <button
                        className="border border-codgray w-24 h-7 rounded-md"
                        onClick={() => changeRole("ORGANIZER")}
                      >
                        organizer
                      </button>
                    </div>
                  </div>
                )}
                {user?.role === "ORGANIZER" && (
                  <div>
                    <div className="flex justify-center text-xs font-semibold">
                      Change Account
                    </div>
                    <div className="flex justify-center gap-2 mt-2">
                      <button
                        className="border border-codgray w-24 h-7 text-codgray rounded-md"
                        onClick={() => changeRole("CUSTOMER")}
                      >
                        user
                      </button>
                      <button className="border border-codgray text-white w-24 h-7 rounded-md bg-red">
                        organizer
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <hr className="border-b-0 border-l-0 border-r-0 border-t-1 mx-7 border-codgray" />
              {user?.role === "ORGANIZER" && (
                <li>
                  <button
                    onClick={() => router.push("/dashboard")}
                    className="block w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Dashboard
                  </button>
                </li>
              )}
              <button
                onClick={() => router.push("/explore")}
                className="block w-full px-4 py-2 text-sm text-codgray dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Explore
              </button>
              <button
                onClick={() => router.push("/ticket")}
                className="block w-full px-4 py-2 text-sm text-codgray dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                My Ticket
              </button>
              <hr className="border-b-0 border-l-0 border-r-0 border-t-1 mx-7 border-codgray" />
              <button
                onClick={() => router.push("/settings")}
                className="block w-full px-4 py-2 text-sm text-codgray dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Account
              </button>
              <button
                onClick={() => router.push("/settings")}
                className="block w-full px-4 py-2 text-sm text-codgray dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Settings
              </button>
              <hr className="border-b-0 border-l-0 border-r-0 border-t-1 mx-7 border-codgray" />
            </li>
            <li>
              <button
                onClick={onLogout}
                className="block text-red w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-600 dark:text-red-400"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default AvatarModal;
