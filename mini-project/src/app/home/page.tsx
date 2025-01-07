import EventCard from "@/components/cardevent";
import Carousel from "@/components/carousel";
import CategoryCards from "@/components/categorycard";
import Features from "@/components/featuresHome";
import { getEvent } from "@/libs/events";

import { IEvent } from "@/types/event";
import Link from "next/link";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

export default async function HomePage() {
  const data: IEvent[] = (await getEvent()) || [];
  // Slice the first 8 events
  const eventsToDisplay = data.slice(0, 8);

  // Split the 8 events into two groups (4 top and 4 bottom)
  const topEvents = eventsToDisplay.slice(0, 4);
  const bottomEvents = eventsToDisplay.slice(4, 8);

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
          Upcoming Events
          <Link href="/event?category=All">
            <button className="text-base text-red hover:text-codgray flex items-center">
              <div className=" flex flex-row hover:text-red text-sm font-light items-center">
                More Events
                <MdOutlineKeyboardArrowRight />
              </div>
            </button>
          </Link>
        </h1>
        <div className="container mx-auto h-px bg-gray-300 my-2" />
      </div>

      {/* Top events (first 4 events) */}
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-2">
        {Array.isArray(topEvents) &&
          topEvents.map((item, idx) => (
            <div key={idx}>
              <EventCard
                thumbnail={item.thumbnail}
                title={item.title}
                avatar={item.organizer.avatar}
                description={item.description}
                slug={item.slug}
                username={item.organizer.username || "Unknown"}
                location={item.location}
                price={Math.min(
                  ...(item.Ticket?.map((ticket) => ticket.price) ?? [0])
                )}
              />
            </div>
          ))}
      </div>

      {/* Bottom events (next 4 events) */}
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-2">
        {Array.isArray(bottomEvents) &&
          bottomEvents.map((item, idx) => (
            <div key={idx}>
              <EventCard
                thumbnail={item.thumbnail}
                title={item.title}
                avatar={item.organizer.avatar}
                description={item.description}
                slug={item.slug}
                username={item.organizer.username || "Unknown"}
                location={item.location}
                price={Math.min(
                  ...(item.Ticket?.map((ticket) => ticket.price) ?? [0])
                )}
              />
            </div>
          ))}
      </div>

      <div>
        <div className="container mx-auto border-t border-dashed border-gray-700 my-5"></div>
        <Features />
      </div>
    </main>
  );
}
