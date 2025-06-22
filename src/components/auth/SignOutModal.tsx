"use client";
import { useState } from "react";
import Divider from "../Divider";
import Cookies from "js-cookie";
import { LinearProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

const SignOutModal = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (session) {
      await signOut({ callbackUrl: "/" });
    }
    if (Cookies.get("token")) {
      Cookies.remove("token");
    }
    if (Cookies.get("username")) {
      Cookies.remove("username");
    }
    router.push("/");
    setLoading(false);
  };
  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative animate-in fade-in-0 zoom-in-95 duration-200">
        {/* Avatar placeholder */}
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
            <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold text-gray-900 text-center mb-2">
          Sign out
        </h1>

        {/* Email form */}
        <div className="mb-6">
          <p className="text-gray-600 text-center text-sm mb-4">
            Are you sure you want to sign out?
          </p>

          <form onSubmit={handleSubmit}>
            {loading && (
              <div className="mb-6">
                <LinearProgress color="primary" />
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-gray-400 hover:bg-gray-500 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 disabled:opacity-50"
            >
              Sign out
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignOutModal;
