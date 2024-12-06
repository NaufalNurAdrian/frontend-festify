import Link from 'next/link';

export default function Sidebar () {
  return (
    <div className="bg-codgray text-white rounded-r-xl h-screen w-52 p-5 hidden lg:block">
      <div className="text-3xl font-extrabold mb-8 text-red ">
        Festify.
      </div>
      <div>
        <div className="mb-4">
          <Link href="/dashboard" className="hover:text-white">
            Dashboard
          </Link>
        </div>
        <div className="mb-4">
          <Link href="/dashboard/eventsaya" className="hover:text-white">
            Event Saya
          </Link>
        </div>
        <div className="mb-4">
          <Link href="/settings" className="hover:text-white">
            Pengaturan
          </Link>
        </div>
        <div className="mb-4">
          <Link href="/accounts" className="hover:text-white">
            Informasi Legal
          </Link>
        </div>
      </div>
    </div>
  );
};