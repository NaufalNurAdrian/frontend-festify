import EventCard from "@/components/cardevent";
import CardEvent from "@/components/cardevent";
import Carousel from "@/components/carousel";
import CategoryCards from "@/components/categorycard";

export default function HomePage() {
  const events = [
    {
      image: "/BannerTerrifier3.jpg",
      title: "CINTA KALA SENJA - BERNADYA",
      date: "18 Dec 2024",
      price: "Rp200.000",
      organizer: "Bengkel Space",
      location: "Jakarta",
    },
    {
      image: "/BannerDWP.jpg",
      title: "HOLIMOON 2024",
      date: "23 Dec 2024",
      price: "Rp125.000",
      organizer: "Deal Indonesia",
      location: "Gorontalo",
    },
    {
      image: "/BannerROC.jpg",
      title: "ROCKAROMA FESTIVAL 2024",
      date: "21 Dec 2024",
      price: "Rp150.000",
      organizer: "86 Production",
      location: "Jakarta",
    },
    {
      image: "/BannerCAS.jpg",
      title: "LAMPUNG NIGHT FAIR bersama...",
      date: "30 Dec 2024",
      price: "Rp120.000",
      organizer: "SEKELIK FEST",
      location: "Lampung",
    },
  ];

  return (
    <main>
      <div className=" mx-auto opacity-90">
        <Carousel />
      </div>
      <div>
        <CategoryCards />
      </div>
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-10">
        {events.map((event, index) => (
          <EventCard
            key={index}
            image={event.image}
            title={event.title}
            date={event.date}
            price={event.price}
            organizer={event.organizer}
            location={event.location}
          />
        ))}{" "}
      </div>
      <div className="bg-red "> </div>
    </main>
  );
}
