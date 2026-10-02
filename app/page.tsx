import TopBar from "./components/TopBar";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import ObjectivesSection from "./components/ObjectivesSection";
import LeadershipSection from "./components/LeadershipSection";
import SICLeadershipSection from "./components/SICLeadershipSection";
import StudentBodySection from "./components/StudentBodySection";
import EventHighlights from "./components/EventHighlights";
import IncubatedStartups from "./components/IncubatedStartups";
import GlobalPartnerships from "./components/GlobalPartnerships";
import Roadshows from "./components/Roadshows";
import ContactForm from "./components/ContactForm";
import MembershipForm from "./components/MembershipForm";
import CollaborationForm from "./components/CollaborationForm";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <TopBar />
      <Header />
      <main className="flex-1" id="main-content">
        <HeroSection />
        {/* CTA Strip between Hero and About */}
        <div className="py-8 px-4">
          <div className="max-w-xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#register"
              id="cta-register-now"
              className="group inline-flex items-center gap-2 bg-[#1a2d50] hover:bg-[#243a63] text-white font-semibold text-sm tracking-wide px-7 py-3 rounded-none shadow-sm hover:shadow-md transition-all duration-200 active:scale-[0.97]"
            >
              Be a Member
              <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="#collaborate"
              id="cta-explore-sectors"
              className="group inline-flex items-center gap-2 bg-accent hover:bg-[#1a2d50] text-white font-semibold text-sm tracking-wide px-7 py-3 rounded-none shadow-sm hover:shadow-md transition-all duration-200 active:scale-[0.97]"
            >
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Collaborate With Us
            </a>
          </div>
        </div>
        <ObjectivesSection />
        <LeadershipSection />
        <SICLeadershipSection />
        <StudentBodySection />
        <EventHighlights />
        <IncubatedStartups />
        <GlobalPartnerships />
        <Roadshows />
        <MembershipForm />
        <CollaborationForm />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
