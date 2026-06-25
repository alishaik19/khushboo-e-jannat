import "./WhyChoose.css";

function WhyChoose() {
  const features = [
    {
      icon: "fa-solid fa-gem",
      title: "Premium Quality",
      description:
        "Crafted from carefully selected ingredients to deliver a luxurious fragrance experience.",
    },
    {
      icon: "fa-solid fa-clock",
      title: "Long Lasting",
      description:
        "Rich and captivating aromas that stay with you throughout the day.",
    },
    {
      icon: "fa-solid fa-leaf",
      title: "Alcohol Free",
      description:
        "Traditional alcohol-free attars suitable for daily wear and special occasions.",
    },
    {
      icon: "fa-solid fa-truck-fast",
      title: "Fast Delivery",
      description:
        "Secure packaging and reliable shipping to ensure every order arrives safely.",
    },
  ];

  return (
    <section className="why-us-section">
      <div className="container">
        <div className="section-header">
          <p className="section-tag">Why Choose Us</p>
          <h2>Crafted For Those Who Value Luxury</h2>
        </div>

        <div className="why-grid">
          {features.map((feature, index) => (
            <div className="why-card" key={index}>
              <div className="icon-box">
                <i className={feature.icon}></i>
              </div>

              <h3>{feature.title}</h3>

              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyChoose;
