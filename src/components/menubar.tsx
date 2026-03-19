"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  BookOpen, 
  Home, 
  UserPlus, 
  LogOut, 
  ShieldCheck,
  GraduationCap 
} from "lucide-react";
import useCustomAuth from "@/libs/customHooks/useCustomAuth";

export default function Navbar() {
  const customAuth = useCustomAuth();
  const pathname = usePathname();
  // Helper to style active links
  const isActive = (path: string) => pathname === path;

  const navLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "My Exams", href: "/myexams", icon: GraduationCap },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="max-w-[1200px] mx-auto px-6 h-16 flex justify-between items-center">
        
        {/* Logo Section */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20 transition-transform group-hover:scale-105">
              <BookOpen size={20} />
            </div>
            <span className="font-bold text-lg tracking-tight hidden sm:block">
              Online<span className="text-primary">Exam</span>
            </span>
          </Link>

          {/* Admin Tag */}
          {customAuth?.isAdmin && (
            <Link
              href="/admin/dashboard"
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-bold hover:bg-amber-200 transition-colors"
            >
              <ShieldCheck size={14} />
              ADMIN
            </Link>
          )}
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-1 md:gap-4">
          <div className="hidden md:flex items-center gap-1 mr-4 border-r border-border pr-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive(link.href) 
                    ? "bg-secondary text-primary" 
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}
              >
                <link.icon size={18} />
                {link.name}
              </Link>
            ))}
          </div>

          {/* Auth Section */}
          <div className="flex items-center gap-2">
            {customAuth ? (
              <Link
                href="/auth/signout"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary/50 text-sm font-medium hover:bg-red-50 hover:text-red-600 transition-all border border-transparent hover:border-red-100"
              >
                <LogOut size={18} />
                <span className="hidden sm:inline">Sign out</span>
              </Link>
            ) : (
              <>
                <Link
                  href="/auth/signin"
                  className="text-sm font-medium px-4 py-2 hover:text-primary transition-colors"
                >
                  Sign in
                </Link>
                <Link
                  href="/auth/signup"
                  className="flex items-center gap-2 px-5 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium shadow-sm hover:shadow-md hover:bg-primary/90 transition-all active:scale-95"
                >
                  <UserPlus size={18} />
                  Join
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}