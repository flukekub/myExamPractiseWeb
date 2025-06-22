import Footer from "@/components/footer";
import Menubar from "@/components/menubar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
          <body >
                <Menubar />
                {children}
                <Footer />
          </body>
    </html>
  );
}