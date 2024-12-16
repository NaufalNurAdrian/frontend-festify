import Link from 'next/link';

export default function Sidebar () {
  return (
    <div className="bg-codgray text-white rounded-r-xl h-screen w-52 p-2 hidden lg:block">
      <div className="flex justify-center text-3xl font-extrabold mb-8 text-red mt-2">
        <Link
        href="/"
        >
        Festify.
        </Link>
      </div>
      <div className="flex flex-col gap-5 mt-10 font-normal">
        <div className="flex p-2 items-center  rounded-md h-8 hover:bg-slate-800">
          <Link href="/dashboard" className="hover:text-white">
            Dashboard
          </Link>
        </div>
        <div className="flex p-2 items-center  rounded-md h-8 hover:bg-slate-800">
          <Link href="/dashboard/eventsaya" className="hover:text-white text-white">
            Event Saya
          </Link>
        </div>
        <div className="flex p-2 items-center  rounded-md h-8 hover:bg-slate-800">
          <Link href="/dashboard/create" className="hover:text-white">
            Create Event
          </Link>
        </div>
        <div className="flex p-2 items-center  rounded-md h-8 hover:bg-slate-800">
          <Link href="/dashboard/profile" className="hover:text-white">
            Profile
          </Link>
        </div>
        <div className="flex p-2 items-center  rounded-md h-8 hover:bg-slate-800">
          <Link href="/settings" className="hover:text-white">
            Pengaturan
          </Link>
        </div>
        <div className="flex p-2 items-center  rounded-md h-8 hover:bg-slate-800">
          <Link href="/accounts" className="hover:text-white">
            Informasi Legal
          </Link>
        </div>
      </div>
    </div>
  );
};