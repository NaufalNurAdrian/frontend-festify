"use client"

import { usePathname } from "next/navigation"
import Navbar from "./navbar";

export default function NavbarExcept() {
    const pathname = usePathname();
    const noNavbarRoutes = ["/dashboard", "/login", "/register", "/dashboard/profile", "/dashboard/create"]
    return noNavbarRoutes.includes(pathname) ? null : <Navbar />
}