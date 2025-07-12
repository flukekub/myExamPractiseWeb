"use client";
import { useState } from "react";
import Divider from "../Divider";
import Cookies from "js-cookie";
import { LinearProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const SignInModal = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/auth/simple-signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        // เก็บ token ใน cookie ด้วย js-cookie (หมดอายุ 7 วัน)
        Cookies.set("token", data.token, { expires: 7, path: "/" });
        Cookies.set("username", email, { expires: 7, path: "/" });
        Cookies.set("isAdmin", data.role === "admin" ? "true" : "false", { expires: 7, path: "/" });
        console.log("Sign in successful");
        router.push("/"); // เปลี่ยนเส้นทางไปหน้าแรก
      } else {
        toast.error("Sign in failed: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      console.error("An error occurred:", err);
    }
    setLoading(false);
  };
  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative animate-in fade-in-0 zoom-in-95 duration-200">
        {/* Close button */}

        {/* Avatar placeholder */}
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
            <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold text-gray-900 text-center mb-2">
          Sign in
        </h1>

        {/* Email form */}
        <div className="mb-6">
          <p className="text-gray-600 text-center text-sm mb-4">
            Enter your email address to sign in
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Your email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-black"
                placeholder="Enter your email"
                required
              />
            </div>

            <Divider txtMiddle="or" />

            <p className="text-gray-600 text-center mb-2">
              Don't have any account?{" "}
              <button className="text-blue-600 hover:text-blue-700 font-medium transition-colors" onClick={() => router.push("/auth/signup")}>
                Sign up
              </button>
            </p>

            {loading && (
              <div className="mb-6">
                <LinearProgress color="primary" />
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-gray-400 hover:bg-gray-600 text-white font-medium py-3 px-4  transition-all duration-200 disabled:opacity-50 rounded-md"
              
              disabled={!email}
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignInModal;
