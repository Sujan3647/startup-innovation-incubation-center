import SICLeadershipSection from "../components/SICLeadershipSection";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TopBar from "../components/TopBar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SIC Leadership — Startup Innovation & Incubation Center | ICFAI University Tripura",
  description:
    "Meet the SIC Leadership team at ICFAI University Tripura's Startup Innovation & Incubation Center (SIC) — driving entrepreneurship and startup culture.",
};

export default function SICLeadershipPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <Header />
      <main className="flex-1">
        <SICLeadershipSection />
      </main>
      <Footer />
    </div>
  );
}
