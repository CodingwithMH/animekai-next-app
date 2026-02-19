import Footer from "@/components/Footer";

export default function BlankLayout({ children }) {
  return (
    <>
      <main className="max-w-screen overflow-x-hidden bg-[#0C1116]">
        {children}
      </main>
      <Footer />
    </>
  );
}
