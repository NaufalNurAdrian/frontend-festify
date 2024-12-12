import EventCard from "@/components/cardevent";
import Carousel from "@/components/carousel";
import CategoryCards from "@/components/categorycard";
import { getEvent } from "@/libs/events";
import { IEvent } from "@/types/event";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

export default async function HomePage() {
  const data: IEvent[] = await getEvent();
  console.log("Fetched data:", data); // Debugging log

  return (
    <main>
      <div className="mx-auto opacity-90">
        <Carousel />
      </div>
      <div>
        <CategoryCards />
      </div>
      <div>
        <h1 className="container mx-auto pt-4 px-4 lg:px-0 text-xl font-medium text-codgray flex justify-between">
          Spotlight Events
          <button className="text-base text-red hover:text-codgray flex items-center">
            Sort by
            <span className="hover:text-red text-lg">
              <MdOutlineKeyboardArrowRight />
            </span>
          </button>
        </h1>
        <div className="container mx-auto h-px bg-gray-300 my-2" />
      </div>
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-2">
        {Array.isArray(data) &&
          data.map((item, idx) => (
            <div key={idx}>
              <EventCard
                thumbnail={item.thumbnail}
                title={item.title}
                avatar={item.organizer.avatar}
                description={item.description}
                slug={item.slug}
                username={item.organizer.username || "Unknown"}
                location={item.location}
              />
            </div>
          ))}
      </div>
      <div className="bg-red">QWERTYUIIOOPPOSADAS</div>
    </main>
  );
}
