"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link"; // Import Link dari Next.js

import { BiMusic } from "react-icons/bi";
import { CgGames } from "react-icons/cg";
import { GiFilmProjector } from "react-icons/gi";
import { MdOutlineSportsVolleyball } from "react-icons/md";
import { getEvent } from "@/libs/events";
// Pastikan fungsi getEvent tersedia

// Interface untuk kategori
interface Category {
  id: number;
  label: string;
  icon: React.ReactNode;
  count?: number;
}

interface Event {
  category: string;
  // Add other properties of the event object if needed
}

export default function CategoryCards() {
  // Daftar kategori tetap yang ingin ditampilkan
  const allCategories: Category[] = [
    {
      id: 1,
      label: "MUSIC",
      icon: <BiMusic size={40} className="text-red-500" />,
    },
    {
      id: 2,
      label: "FILM",
      icon: <GiFilmProjector size={40} className="text-red-500" />,
    },
    {
      id: 3,
      label: "SPORT",
      icon: <MdOutlineSportsVolleyball size={40} className="text-red-500" />,
    },
    {
      id: 4,
      label: "EDUCATION",
      icon: <CgGames size={40} className="text-red-500" />,
    },
  ];

  const [categories, setCategories] = useState<Category[]>([]); // State untuk kategori dan jumlahnya
  const [loading, setLoading] = useState<boolean>(true); // State untuk loading

  useEffect(() => {
    const fetchData = async () => {
      try {
        const events = await getEvent(); // Ambil data event
        console.log("Fetched events:", events);

        // Kelompokkan event berdasarkan kategori dan hitung jumlahnya
        const categoryCounts = events.reduce(
          (acc: Record<string, number>, event: Event) => {
            const category = event.category; // Ambil kategori dari event
            // Hanya hitung kategori yang ada di dalam `allCategories`
            if (
              category &&
              allCategories.some((cat) => cat.label === category)
            ) {
              acc[category] = (acc[category] || 0) + 1; // Hitung jumlah kategori
            }
            return acc;
          },
          {}
        );

        // Gabungkan kategori tetap dengan kategori yang dihitung
        const updatedCategories = allCategories.map((category) => {
          return {
            ...category,
            count: categoryCounts[category.label] || 0, // Jika kategori tidak ada, set count 0
          };
        });

        setCategories(updatedCategories); // Set kategori beserta jumlahnya
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false); // Hentikan loading
      }
    };

    fetchData();
  }, []);

  return (
    <div className="lg:flex container mx-auto md:flex justify-center gap-5 py-14 hidden ">
      {loading
        ? allCategories.map((category) => (
            <div
              key={category.id}
              className="flex flex-col items-center justify-center w-40 h-40 bg-gray-200 rounded-xl shadow-lg animate-pulse"
            >
              <div className="w-12 h-12 bg-gray-300 rounded-full mb-4"></div>
              <div className="w-16 h-4 bg-gray-300 rounded mb-2"></div>
              <div className="w-20 h-4 bg-gray-300 rounded"></div>
            </div>
          ))
        : categories.map((category) => (
            <Link
              key={category.id}
              href={`/event?category=${category.label}`} // Link ke URL berdasarkan kategori
              passHref
            >
              <div className="flex flex-col items-center justify-center w-40 h-40 bg-gray-100 rounded-xl shadow-lg border border-gray-200 text-red hover:scale-105 cursor-pointer">
                {category.icon}
                <p className="text-gray-500 mt-4">{category.count}</p>
                <p className="text-black font-normal">{category.label}</p>
              </div>
            </Link>
          ))}
    </div>
  );
}
