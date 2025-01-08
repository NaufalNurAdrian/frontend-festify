"use client";

import { usePathname } from "next/navigation";
import Navbar from "./navbar";

export default function NavbarExcept() {
  const pathname = usePathname();
  const noNavbarRoutes = [
    "/dashboard",
    "/login",
    "/register",
    "/dashboard/profile",
    "/dashboard/create",
    "/dashboard/myevent",
    "/dashboard/settings",
    "/signup",
    "/dashboard/myticket",
    "/forgotpass",
    "/dashboard/review",
    "/dashboard/gatein"
  ];
  return noNavbarRoutes.includes(pathname) ? null : <Navbar />;
}
