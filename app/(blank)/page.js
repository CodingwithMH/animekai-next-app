import Content from "@/components/Content";
import Hero from "@/components/Hero";
import LandingHeader from "@/components/LandingHeader";
import Share from "@/components/Share";

const LandingPage = () => {
  return (
    <>
    <LandingHeader/>
      <Hero />
      <Share />
      <Content />
    </>
  );
};

export default LandingPage;
