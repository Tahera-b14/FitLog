import { Inter, Oswald } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PlanProvider } from "@/components/PlanContext";

const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = {
  title: "FitLog — Workout Library",
  description: "Pick a lift, lock it into today's plan, and watch the week's work add up.",
  icons: { icon: "/logo.png" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${oswald.variable} ${inter.variable}`}>
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <PlanProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: { background: "#1d1d20", color: "#fff", border: "1px solid #2a2a2e" },
              success: { iconTheme: { primary: "#ccff00", secondary: "#0b0b0c" } },
            }}
          />
        </PlanProvider>
      </body>
    </html>
  );
}
