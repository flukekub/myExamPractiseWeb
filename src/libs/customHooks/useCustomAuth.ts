"use client";
import { useSession } from "next-auth/react";
import Cookies from "js-cookie";

export default function useCustomAuth() {
  const { data: session, status } = useSession();
  const token = Cookies.get("token");
  const username = Cookies.get("username");
  const isAdmin = Cookies.get("isAdmin");

  if (session && status === "authenticated") {
    return {session, isAdmin};
  } else if (token) {
    return { token, username, isAdmin: isAdmin === "true" };
  } else {
    return null;
  }
}
