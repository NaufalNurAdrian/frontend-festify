"use client";
import React, { useEffect, useState } from "react";
import EventCard from "@/components/cardevent";
import authGuard from "@/hoc/authGuard";
import { getEventCompleted, getEventUser } from "@/libs/events";
import { IEvent } from "@/types/event";

const MyEventPage = () => {
  const [data, setData] = useState<IEvent[]>([]);
  const [dataEvetCompleted, setDataEvetCompleted] = useState<IEvent[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const activeEvents = await getEventUser();
        const completedEvents = await getEventCompleted();
        setData(activeEvents);
        setDataEvetCompleted(completedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col p-5">
      <div>
        <div>
          <h1 className="text-2xl font-bold">Event Active</h1>
        </div>

        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-2">
          {Array.isArray(data) &&
            data.map((item, idx) => (
              <div key={idx}>
                <EventCard
                  thumbnail={item.thumbnail}
                  title={item.title}
                  avatar={item.organizer.avatar || "/festifylogo.png"}
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
      </div>
      <div>
        <div>
          <h1 className="text-2xl font-bold">Event Left</h1>
        </div>

        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-2">
          {Array.isArray(dataEvetCompleted) &&
            dataEvetCompleted.map((item, idx) => (
              <div key={idx}>
                <EventCard
                  thumbnail={item.thumbnail}
                  title={item.title}
                  avatar={item.organizer.avatar || "/festifylogo.png"}
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
      </div>
    </div>
  );
};

export default authGuard(MyEventPage);
