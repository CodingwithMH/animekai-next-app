import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function MainLayout({ children }) {
  return (
    <>
    <Header />
      <main className="max-w-screen overflow-x-hidden bg-[#0C1116]">
        {children}
      </main>
      <Footer />
    </>
  );
}
