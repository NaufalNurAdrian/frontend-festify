export function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export function formatDateTime(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, // Menggunakan format 24 jam
  });
}
