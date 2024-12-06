import DashboardHeader from "@/components/dashboarHeader";
import Sidebar from "@/components/sidebar";

export default function Home() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <DashboardHeader />
        <div className="p-6">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
            <div className="bg-white shadow p-4 rounded">
              <h3 className="font-bold text-lg">Event Aktif</h3>
              <p>0 Event</p>
            </div>
            <div className="bg-white shadow p-4 rounded">
              <h3 className="font-bold text-lg">Event Draft</h3>
              <p>0 Event</p>
            </div>
            <div className="bg-white shadow p-4 rounded">
              <h3 className="font-bold text-lg">Total Transaksi</h3>
              <p>Rp 0</p>
            </div>
            <div className="bg-white shadow p-4 rounded">
              <h3 className="font-bold text-lg">Total Tiket Terjual</h3>
              <p>0 Tiket</p>
            </div>
            <div className="bg-white shadow p-4 rounded">
              <h3 className="font-bold text-lg">Total Pengunjung</h3>
              <p>0 Orang</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}