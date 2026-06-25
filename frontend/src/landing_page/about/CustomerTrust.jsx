import "./CustomerTrust.css";
import { FaUsers, FaBoxOpen, FaStar, FaShippingFast } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

function CustomerTrust() {
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

  const stats = [
    {
      icon: <FaUsers />,
      number: "500+",
      title: "Happy Customers",
    },
    {
      icon: <FaBoxOpen />,
      number: "20+",
      title: "Premium Attars",
    },
    {
      icon: <FaStar />,
      number: "100%",
      title: "Authentic Quality",
    },
    {
      icon: <FaShippingFast />,
      number: "Fast",
      title: "Delivery Service",
    },
  ];

  return (
    <section className="trust-section">
      <div className="container">
        <div
          className="trust-heading"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <span>TRUST & QUALITY</span>

          <h2>Why Customers Love Us</h2>

          <p>
            Crafted with passion, trusted by fragrance lovers, and inspired by
            timeless luxury.
          </p>
        </div>

        <div className="trust-grid">
          {stats.map((item, index) => (
            <div
              key={index}
              className="trust-card"
              data-aos="zoom-in-up"
              data-aos-delay={index * 150}
              data-aos-duration="1000"
            >
              <div className="trust-icon">{item.icon}</div>

              <h3>{item.number}</h3>

              <p>{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CustomerTrust;
