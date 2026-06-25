import { useState } from "react";
import "./Faq.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
function Faq() {
  const [active, setActive] = useState(null);

  const faqs = [
    {
      question: "How long does an attar fragrance last?",
      answer:
        "Our premium attars typically last between 8–12 hours depending on skin type and weather conditions.",
    },
    {
      question: "Are your attars alcohol free?",
      answer:
        "Yes, all our attars are completely alcohol-free and crafted using traditional fragrance techniques.",
    },
    {
      question: "How many days does delivery take?",
      answer:
        "Orders are usually delivered within 3–7 business days depending on your location.",
    },
    {
      question: "Can I return my order?",
      answer:
        "Yes, you can request a return according to our return policy if the product is eligible.",
    },
    {
      question: "Are these fragrances suitable for daily use?",
      answer:
        "Absolutely. Our attars are designed for both daily wear and special occasions.",
    },
  ];

  const toggleFaq = (index) => {
    setActive(active === index ? null : index);
  };

  return (
    <section className="faq-section">
      <div className="container">
        <div className="faq-header">
          <p className="faq-tag">Frequently Asked Questions</p>
          <h2>Everything You Need To Know</h2>
        </div>

        <div className="faq-container">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`faq-item ${active === index ? "active" : ""}`}
            >
              <button className="faq-question" onClick={() => toggleFaq(index)}>
                <span>{faq.question}</span>
                <span className="faq-icon">
                  {active === index ? <FaEyeSlash /> : <FaEye />}
                </span>
              </button>

              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Faq;
