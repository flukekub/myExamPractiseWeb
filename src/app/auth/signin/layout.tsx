
import { Toaster } from "@/components/ui/sonner";
export default function SignInLayout({
    children,
    }: {
    children: React.ReactNode;
    }) {
    return (
        <html lang="en">
        <body className="min-h-screen">
            {children}
            <Toaster key="app-toaster" />
        </body>
        </html>
    );
    }