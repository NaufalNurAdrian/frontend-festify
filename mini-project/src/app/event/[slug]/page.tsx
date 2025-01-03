import EventTabs from "@/components/eventTabs";
import { getEventSlug } from "@/libs/events";
import { IEvent } from "@/types/event";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const data: IEvent = await getEventSlug(params.slug);

  return {
    title: data.title,
    description: data.description,
    openGraph: {
      images: [`https:${data.thumbnail}`],
    },
  };
}

export default async function EventDetail({
  params,
}: {
  params: { slug: string };
}) {
  const data: IEvent = await getEventSlug(params.slug);

  return (
    <EventTabs
      data={data}
      ticketResult={[]}
      params={{
        event_id: "",
      }}
    />
  );
}
