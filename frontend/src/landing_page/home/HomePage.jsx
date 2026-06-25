import Hero from "./Hero";
import Cards from "./Cards";
import Scam from "./Scam";
// import HomeVideo from "./HomeVideo";
import WhyChoose from "./WhyChoose";
import Faq from "./Faq";

function HomePage() {
  return (
    <div className="home-page">
      {/* <HomeVideo /> */}
      <Hero />
      <Cards />
      <WhyChoose />
      <Faq />
      <Scam />
    </div>
  );
}

export default HomePage;
