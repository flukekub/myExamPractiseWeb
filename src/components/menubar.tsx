// components/Navbar.tsx
"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { FaBookOpen, FaHome, FaUser, FaUserCheck } from "react-icons/fa";
import useCustomAuth from "@/libs/customHooks/useCustomAuth";

export default function menubar() {
  
  const customAuth = useCustomAuth();

  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center sticky top-0 z-50">
      <div className="flex items-center gap-2 text-blue-600 font-bold text-xl">
        <FaBookOpen className="text-2xl" />
        <span>Online Exam</span>
      </div>

      <div className="flex space-x-6 text-gray-700 font-medium">
        <Link
          href="/"
          className="flex items-center gap-1 hover:text-blue-600 transition"
        >
          <FaHome /> Home
        </Link>
        <Link
          href="/myexams"
          className="flex items-center gap-1 hover:text-blue-600 transition"
        >
          <FaBookOpen /> My Exams
        </Link>

        {customAuth ? (
          <Link
            href="auth/signout"
            className="flex items-center gap-1 hover:text-blue-600 transition"
          >
            <FaUser /> Sign out
          </Link>
        ) : (
          <>
            <Link
              href="auth/signup"
              className="flex items-center gap-1 hover:text-blue-600 transition"
            >
              <FaUser /> Sign up
            </Link>
            <Link
              href="auth/signin"
              className="flex items-center gap-1 hover:text-blue-600 transition"
            >
              <FaUserCheck /> Sign in
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
