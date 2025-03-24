"use client";

import "@/app/ui/global.css";
import React from "react";
import Link from "next/link";
import { Search, User, ShoppingBag, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import UserLayoutHeader from "../components/userLayoutHeader";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  return (
    <div className="w-full border-b">
      {/* Top Bar */}
      <UserLayoutHeader />

      {/* Main Navigation */}
      <div className="flex justify-between items-center px-8 py-4 bg-white">
        {/* Logo */}
        <Image
          src="/lofree_logo_black.avif"
          alt="logo"
          width={70}
          height={70}
          className="text-2xl font-bold cursor-pointer"
          onClick={() => router.push("/home")}
        />

        {/* Navigation Links */}
        <nav className="space-x-6 text-lg font-medium flex gap-5 ">
          <div className="flex items-center justify-center cursor-pointer">
            <Link href="#">Mechanical Keyboards </Link>
            <ChevronDown width={20} height={20} />
          </div>
          <Link href="#">Keycaps</Link>
          <Link href="#">Switches</Link>
          <Link href="#">Mice</Link>
          <Link href="#">Accessories</Link>
        </nav>

        {/* Icons */}
        <div className="flex items-center space-x-4 gap-2">
          <Search className="w-5 h-5 cursor-pointer" />
          <User className="w-5 h-5 cursor-pointer" />
          <ShoppingBag className="w-5 h-5 cursor-pointer" />
        </div>
      </div>
      {children}
    </div>
  );
}
