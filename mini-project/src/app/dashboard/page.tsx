import TickPlacementBars from "@/components/chart";
import DashboardData from "@/components/dashboard";
import BasicPie from "@/components/pie";

export default function Home() {
  return (
    <div className="flex flex-col">
      <div>
        <DashboardData />
      </div>
      <div className="flex justify-center items-center p-5">
        <div className="flex flex-1">
          <TickPlacementBars />
        </div>
        <div className="flex flex-1">
          <BasicPie />
        </div>
      </div>
    </div>
  );
}
