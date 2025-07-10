import Footer from "@/components/footer";
import Menubar from "@/components/menubar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Menubar />
      <div className="flex-1  flex flex-col">{children}</div>
      <Footer />
    </div>
  );
}
