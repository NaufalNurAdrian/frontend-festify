const base_url = process.env.NEXT_PUBLIC_BASE_URL_BE;

export const getEvent = async () => {
  const res = await fetch(`${base_url}/event`, {
    next: { revalidate: 10 },
  });
  const data = await res.json();
  return data.events;
};

export const getEventUser = async () => {
  const res = await fetch(`${base_url}/event/user`, {
    next: { revalidate: 0 },
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  const data = await res.json();
  return data.events;
};

export const getEventCompleted = async () => {
  const res = await fetch(`${base_url}/event/completed`, {
    next: { revalidate: 0 },
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  const data = await res.json();
  return data.events;
};

// libs/events.ts

export const getEventSlug = async (slug: string) => {
  const res = await fetch(`${base_url}/event/${slug}`, {
    next: { revalidate: 10 }, // Opsional: Hapus atau sesuaikan sesuai kebutuhan
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch event with slug: ${slug}`);
  }

  const data = await res.json();
  return data.events; // Pastikan API mengembalikan data yang sesuai dengan tipe IEvent
};
