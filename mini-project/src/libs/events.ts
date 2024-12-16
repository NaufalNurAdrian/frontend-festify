import { IEvent } from "@/types/event";
import axios from "axios";

export const getEvent = async () => {
  const res = await fetch(`http://localhost:8000/api/event`, {
    next: { revalidate: 60 },
  });
  const data = await res.json();
  return data.events;
};

// libs/events.ts

export const getEventSlug = async (slug: string) => {
  const res = await fetch(`http://localhost:8000/api/event/${slug}`, {
    next: { revalidate: 60 }, // Opsional: Hapus atau sesuaikan sesuai kebutuhan
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch event with slug: ${slug}`);
  }

  const data = await res.json();
  return data.events; // Pastikan API mengembalikan data yang sesuai dengan tipe IEvent
};
