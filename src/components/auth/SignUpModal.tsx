"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { LinearProgress } from "@mui/material";
import { useRouter } from "next/navigation";

const SignUpModal = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await signIn("email", { email, callbackUrl: "/" }); // "email" คือ id ของ EmailProvider
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
          Sign up with your email
        </h1>

        {/* Subtitle */}
        <p className="text-gray-600 text-center mb-8">
          Already have an account?{" "}
          <button className="text-blue-600 hover:text-blue-700 font-medium transition-colors" onClick={() => router.push("/auth/signin")}>
            Log in
          </button>
        </p>

        {/* Email form */}
        <div className="mb-6">
          <p className="text-gray-600 text-center text-sm mb-4">
            Enter your email address to create an account
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
            {loading && (
              <div className="mb-6">
                <LinearProgress color="primary" />
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-gray-400 hover:bg-gray-500 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 disabled:opacity-50"
              disabled={!email}
            >
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpModal;
