import Link from "next/link";
import SearchBar from "./searchbar";
import { Avatar } from "./avatar";

export default function Navbar() {

  return (
    <header className="bg-white shadow-2xl">
      <div className="container mx-auto flex items-center justify-between py-3 px-4">
        {/* logo dan search Bar */}
        <div className="flex items-center space-x-4 w-full lg:w-auto">
          <Link href="/">
            <div className="text-red font-bold text-3xl">Festify.</div>
          </Link>
          {/* kolom search desktop */}
          <SearchBar />
        </div>

        {/* navigation */}
        <div className=" hidden lg:flex items-center space-x-6 text-sm text-gray-700 md:ml-4">
          <Link
            href="/create-event"
            className="hover:text-gray-900 whitespace-nowrap "
          >
            Create Events
          </Link>
          <Link href="/event" className="hover:text-gray-900">
            Explore
          </Link>
          <Avatar />
        </div>

        {/* hamburger menu dimobile */}
        <div className="lg:hidden flex items-center space-x-4">
          <SearchBar isMobile />
          <Avatar />
        </div>
      </div>
    </header>
  );
}
