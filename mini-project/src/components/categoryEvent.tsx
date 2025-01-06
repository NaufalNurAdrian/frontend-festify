// "use client";
// import { useEffect, useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import { Navigation } from "swiper/modules";
// import { IEvent } from "@/types/event"; // Pastikan tipe ini sudah ada
// import EventCard from "./cardevent";

// const CATEGORY_OPTIONS = ["MUSIC", "FILM", "SPORT", "EDUCATION"]; // Pilihan kategori

// const PopularEvents = () => {
//   const [events, setEvents] = useState<IEvent[]>([]); // Menyimpan semua data event
//   const [filteredEvents, setFilteredEvents] = useState<IEvent[]>([]); // Menyimpan event yang sudah difilter
//   const [selectedCategory, setSelectedCategory] = useState<string>("MUSIC"); // Default kategori MUSIC

//   useEffect(() => {
//     const fetchEvents = async () => {
//       const base_url = process.env.NEXT_PUBLIC_BASE_URL_BE;
//       const res = await fetch(`${base_url}/api/event`); // Fetch data event dari API
//       const data: IEvent[] = await res.json(); // Pastikan tipe data benar
//       setEvents(data); // Simpan semua event
//     };

//     fetchEvents();
//   }, []);

//   useEffect(() => {
//     // Filter event berdasarkan kategori yang dipilih
//     const filtered = events.filter(
//       (event) => event.category.toUpperCase() === selectedCategory
//     );
//     setFilteredEvents(filtered);
//   }, [events, selectedCategory]);

//   return (
//     <div className="bg-blue-900 py-10">
//       <div className="container mx-auto px-4">
//         <div className="mb-8">
//           <span className="text-blue-500 bg-blue-100 px-3 py-1 rounded-full font-semibold">
//             CATEGORY EVENT
//           </span>
//           <h2 className="text-3xl font-bold text-white mt-3">
//             Pilih event berdasarkan kategori
//           </h2>
//         </div>
//         <div className="flex gap-4 mb-6">
//           {CATEGORY_OPTIONS.map((category) => (
//             <button
//               key={category}
//               onClick={() => setSelectedCategory(category)}
//               className={`px-4 py-2 rounded-full font-semibold ${
//                 selectedCategory === category
//                   ? "bg-blue-500 text-white"
//                   : "bg-white text-blue-500"
//               }`}
//             >
//               {category}
//             </button>
//           ))}
//         </div>
//         <Swiper
//           navigation={true}
//           modules={[Navigation]}
//           spaceBetween={20}
//           slidesPerView={4}
//           breakpoints={{
//             640: { slidesPerView: 1 },
//             768: { slidesPerView: 2 },
//             1024: { slidesPerView: 4 },
//           }}
//         >
//           {Array.isArray(filteredEvents) &&
//             filteredEvents.map((item, idx) => (
//               <SwiperSlide key={idx}>
//                 <EventCard
//                   thumbnail={item.thumbnail}
//                   title={item.title}
//                   avatar={item.organizer.avatar}
//                   description={item.description}
//                   slug={item.slug}
//                   username={item.organizer.username || "Unknown"}
//                   location={item.location}
//                   price={Math.min(
//                     ...(item.Ticket?.map((ticket) => ticket.price) ?? [0])
//                   )}
//                 />
//               </SwiperSlide>
//             ))}
//         </Swiper>
//       </div>
//     </div>
//   );
// };

// export default PopularEvents;
