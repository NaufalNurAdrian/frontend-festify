import EventTabs from "@/components/chartYear";
import DashboardData from "@/components/dashboardData";
import BasicPie from "@/components/pie";
import { getEventSlug } from "@/libs/events";
import { IEvent } from "@/types/event";

export default async function Home({
  params,
}: {
  params: { slug: string };
}) {
  const data: IEvent = await getEventSlug(params.slug);
  return (
    <div className="container mx-auto flex flex-col gap-2">
      
    <div className="w-full">
      <DashboardData />
    </div>
    
    <div className="flex flex-wrap justify-center gap-6 p-5">
      <div className="flex flex-1 justify-center">
        <EventTabs data={data} />
      </div>
      <div className="flex flex-1 justify-center">
        <BasicPie />
      </div>
    </div>
  </div>
  );
}
