const base_url = process.env.NEXT_PUBLIC_BASE_URL_BE;

const getToken = (): string => {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("token") || "";
};

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
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  const data = await res.json();
  return data.events;
};

export const getEventCompleted = async () => {
  const res = await fetch(`${base_url}/event/completed`, {
    next: { revalidate: 0 },
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  const data = await res.json();
  return data.events;
};

export const getEventSlug = async (slug: string) => {
  const res = await fetch(`${base_url}/event/${slug}`, {
    next: { revalidate: 10 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch event with slug: ${slug}`);
  }

  const data = await res.json();
  return data.events;
};