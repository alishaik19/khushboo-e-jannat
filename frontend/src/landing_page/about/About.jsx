import "./About.css";

function About() {
  return (
    <div className="about-page">
      {/* HERO (FULL HEIGHT) */}
      <section className="about-hero">
        <div className="hero-content">
          <h1>Khushboo-e-Jannat</h1>
          <p>Not just a fragrance — it's an emotion crafted in every drop.</p>
        </div>
      </section>

      {/* BRAND STORY */}
      <section className="about-story">
        <div className="container">
          <div className="story-card">
            <h2>🌿 Our Essence</h2>
            <p>
              We believe fragrance is a memory that stays forever. Our attars
              are crafted with purity and tradition.
            </p>
          </div>

          <div className="story-card">
            <h2>✨ Our Vision</h2>
            <p>
              To redefine luxury fragrances with affordability and authenticity.
            </p>
          </div>

          {/* NEW 2 SECTIONS */}
          <div className="story-card">
            <h2>🧪 Craftsmanship</h2>
            <p>
              Each bottle is carefully blended using traditional distillation
              techniques to ensure long-lasting natural aroma.
            </p>
          </div>

          <div className="story-card">
            <h2>🌸 Inspiration</h2>
            <p>
              Inspired by nature, emotions, and timeless Mughal perfumery
              traditions that define elegance.
            </p>
          </div>
        </div>
      </section>

      {/* FOUNDER */}
      <section className="founder-section">
        <div className="container founder-box">
          <div className="founder-img">
            <img src="/ali.jpeg" alt="Founder" />
          </div>

          <div className="founder-info">
            <h2>Meet the Founder</h2>
            <h3>Ali Shaikh</h3>
            <p>
              “Khushboo-e-Jannat is my passion to bring back real fragrance
              culture with purity and elegance.”
            </p>
            <span>— Founder & Creator</span>
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
