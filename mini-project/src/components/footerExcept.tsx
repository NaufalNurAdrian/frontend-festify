"use client";

import { usePathname } from "next/navigation";
import Footer from "./footer";

export default function FooterExcept() {
  const pathname = usePathname();

  // Extract the transaction_id from the pathname if it's part of the URL
  const transactionIdRegex = /\/transactions\/([^/]+)/;
  const match = pathname.match(transactionIdRegex);
  const transaction_id = match ? match[1] : null; // If a match is found, use the transaction_id

  const noNavbarRoutes = [
    "/dashboard",
    "/login",
    "/register",
    "/dashboard/profile",
    "/dashboard/create",
    "/dashboard/myevent",
    "/dashboard/myticket",
    "/dashboard/settings",
    "/dashboard/review",
    "/signup",
    "/transactions",
    "/dashboard/gatein",
    transaction_id ? `/transactions/${transaction_id}` : null, // Add the dynamically generated path
  ];

  return noNavbarRoutes.includes(pathname) ? null : <Footer />;
}
