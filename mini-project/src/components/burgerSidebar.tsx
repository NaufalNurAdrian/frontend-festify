"use client";

import Link from "next/link";

interface BurgerSidebarProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

const BurgerSidebar: React.FC<BurgerSidebarProps> = ({ isMenuOpen, toggleMenu }) => {
  return (
    <>
      {isMenuOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-start items-center z-50">
          <div
            className="bg-codgray rounded-r-xl text-white p-6 w-[300px] h-full shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-start">
              <button onClick={toggleMenu}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="w-6 h-6 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div>
      <div className="text-3xl font-extrabold text-red mb-8">
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
          </div>
        </div>
      )}
    </>
  );
};

export default BurgerSidebar;