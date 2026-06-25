import "./About.css";
import CustomerTrust from "./CustomerTrust";
import Team from "./Team";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
function About() {
  useEffect(() => {
    AOS.init({
      duration: 500,
      once: false,
      mirror: true,
      offset: 120,
    });

    setTimeout(() => {
      AOS.refreshHard();
    }, 100);
  }, []);
  return (
    <div className="about-page">
      {/* HERO (FULL HEIGHT) */}
      <section className="about-story">
        <div className="story-wrapper">
          <div className="story-left" data-aos="fade-right">
            <span className="story-tag">OUR STORY</span>

            <h2>
              Crafted With Tradition,
              <br />
              Inspired By Luxury
            </h2>

            <p>
              At Khushboo-e-Jannat, every fragrance is carefully crafted to
              blend timeless tradition with modern elegance. We believe attar is
              not just a scent—it is an emotion that stays with you.
            </p>

            <div className="story-stats">
              <div>
                <h3>20+</h3>
                <span>Premium Attars</span>
              </div>

              <div>
                <h3>500+</h3>
                <span>Happy Customers</span>
              </div>
            </div>
          </div>

          <div className="StoryRight" data-aos="fade-left">
            <img src="/heroAttar.png" alt="Attar Collection" />
          </div>
        </div>
      </section>
      <CustomerTrust />
      <Team />
      {/* BRAND STORY */}

      {/* FOUNDER */}
      <section className="founder-section">
        <div className="container founder-box">
          <div
            className="founder-img"
            data-aos="fade-right"
            data-aos-duration="700"
          >
            <img src="/ali.jpeg" alt="Founder" />
          </div>

          <div
            className="founder-info"
            data-aos="fade-left"
            data-aos-duration="700"
          >
            <span className="founder-tag">FOUNDER'S MESSAGE</span>

            <h2>Meet The Founder</h2>

            <h3>Ali Sheikh</h3>

            <p>
              “Khushboo-e-Jannat is my passion to revive the timeless art of
              attars and bring authentic fragrance experiences to everyone.
              Every bottle is crafted with dedication, purity, and elegance.”
            </p>

            <div className="founder-signature">
              <span>— Founder & Creator</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <h2>Experience the Art of Fragrance</h2>
        <a href="/#products" className="cta-btn">
          Explore Collection
        </a>
      </section>
    </div>
  );
}

export default About;
