import "./Team.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

function Team() {
  useEffect(() => {
    AOS.init({
      duration: 500,
      once: false,
      mirror: true,
      offset: 100,
    });

    AOS.refresh();
  }, []);
  const members = [
    {
      name: "Ali Sheikh",
      role: "Founder & Creator",
      image: "/ali2.jpg",
    },
    {
      name: "Aryan Khan",
      role: "Fragrance Specialist",
      image: "/aryan.jpg",
    },
    {
      name: "Zaid Ansari",
      role: "Quality Expert",
      image: "/zaid.jpg",
    },
    {
      name: "Arham Sheikh",
      role: "Customer Experience",
      image: "/arham.jpg",
    },
  ];

  return (
    <section className="team-section">
      <div className="container">
        <div className="team-heading" data-aos="fade-up">
          <span>OUR TEAM</span>
          <h2>Meet The People Behind The Fragrance</h2>

          <p >
            A passionate team dedicated to crafting premium attars and creating
            unforgettable fragrance experiences.
          </p>
        </div>

        <div className="team-grid">
          {members.map((member, index) => (
            <div
              className="team-card"
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 150}
            >
              <div className="team-image">
                <img src={member.image} alt={member.name} />
              </div>

              <div className="team-content">
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Team;
