import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBookBar from "@/components/MobileBookBar";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Artists from "@/components/sections/Artists";
import Gallery from "@/components/sections/Gallery";
import Booking from "@/components/sections/Booking";
import GiftCards from "@/components/sections/GiftCards";
import Reviews from "@/components/sections/Reviews";
import Hygiene from "@/components/sections/Hygiene";
import Visit from "@/components/sections/Visit";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Services />
        <Artists />
        <Gallery />
        <Booking />
        <GiftCards />
        <Reviews />
        <Hygiene />
        <Visit />
      </main>
      <Footer />
      <MobileBookBar />
    </>
  );
}
