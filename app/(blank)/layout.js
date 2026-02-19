import Footer from "@/components/Footer";

export default function BlankLayout({ children }) {
  return (
    <>
      <main className="max-w-screen overflow-x-hidden">
        {children}
      </main>
      <Footer />
    </>
  );
}
