import TopBar from "../components/TopBar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import IncubatedStartups from "../components/IncubatedStartups";

export default function StartupsPage() {
  return (
    <>
      <TopBar />
      <Header />
      <main className="flex-1 min-h-[calc(100vh-200px)] bg-white" id="main-content">
        <div className="pt-8">
          <IncubatedStartups hideViewAll={true} subtitle="1 Lakh Grant Support from DIT" />
        </div>
      </main>
      <Footer />
    </>
  );
}
