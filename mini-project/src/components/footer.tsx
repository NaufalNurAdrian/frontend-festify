import React from "react";
import Link from "next/link";
import { FaInstagram, FaFacebook } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-red opacity-90 text-white py-8">
      <div className="container mx-auto px-4 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Section 1: Logo and Social Media */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Festify</h2>
          <p className="mb-6">
            Manage Your Event Tickets Much Easier With Festify
          </p>
          <div className="flex space-x-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 text-white"
            >
              <FaInstagram size={32} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 text-white"
            >
              <FaFacebook size={32} />
            </a>
          </div>
        </div>

        {/* Section 2: Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <Link href="/terms" className="hover:underline">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link href="/pricing" className="hover:underline">
                Price
              </Link>
            </li>
            <li>
              <Link href="/privacy-policy" className="hover:underline">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:underline">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:underline">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:underline">
                Blog
              </Link>
            </li>
          </ul>
        </div>

        {/* Section 3: Contact */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
          <p className="mb-2">
            Jl. Gatot Subroto II B No. 7A, Denpasar Bali, Andromeda Building
          </p>
          <p className="mb-2">
            Email:{" "}
            <a href="mailto:support@tiketevent.com" className="hover:underline">
              support@festify.com
            </a>
          </p>
          <p>
            Phone:{" "}
            <a href="tel:+62895709686622" className="hover:underline">
              +6289111222333
            </a>
          </p>
        </div>
      </div>

      <div className="mt-8 border-t border-white pt-4 text-center text-sm">
        <p>Copyright © 2024 Festify (PT Festify Tix). All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
