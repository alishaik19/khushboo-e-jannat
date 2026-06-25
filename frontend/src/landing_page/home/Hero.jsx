import "./Hero.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

function Hero() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
  }, []);

  return (
    <section className="hero-section d-flex align-items-center">
      <div className="container">
        <div className="row align-items-center flex-column-reverse flex-lg-row">
          <div
            className="col-lg-6 hero-text text-center text-lg-start"
            data-aos="fade-right"
          >
            <p className="tagline">Luxury Attar Collection</p>

            <h1>
              Feel the Essence of <span>Khushboo-e-Jannat</span>
            </h1>

            <p className="description">
              Discover premium, long-lasting attars crafted with tradition and
              elegance. A fragrance that defines your personality and leaves a
              lasting impression.
            </p>

            <div className="hero-buttons">
              <a href="#products" className="btn-outline">
                <span>Explore Collection</span>
              </a>
            </div>
          </div>

          <div
            className="col-12 col-lg-6 text-center story-right"
            data-aos="zoom-in"
          >
            <img src="/attarAbout.png" alt="Attar Bottle" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
