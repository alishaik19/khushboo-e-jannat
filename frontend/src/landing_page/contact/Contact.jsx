import { useState } from "react";
import "./Contact.css";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // input change handler
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // submit handler
  const handleSubmit = (e) => {
    e.preventDefault();

    // validation
    if (!form.name || !form.email || !form.subject || !form.message) {
      alert("⚠ Please fill all fields");
      return;
    }

    // email simple validation
    const emailPattern = /\S+@\S+\.\S+/;
    if (!emailPattern.test(form.email)) {
      alert("⚠ Please enter a valid email");
      return;
    }

    // success
    alert("✅ Message sent successfully!");

    // reset form
    setForm({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="contact-page">
      {/* HERO */}
      <section className="contact-hero">
        <h1>Get in Touch</h1>
        <p>We’d love to hear from you.</p>
      </section>

      {/* FORM */}
      <section className="contact-section">
        <div className="container contact-grid">
          <form className="contact-form" onSubmit={handleSubmit}>
            <h2>Send a Message</h2>

            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
            />

            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={form.subject}
              onChange={handleChange}
            />

            <textarea
              name="message"
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
            />

            <button type="submit">Send Message</button>
          </form>

          {/* INFO */}
          <div className="contact-info">
            <h2>Contact Info</h2>
            <p>📍 Mumbai, India</p>
            <p>📞 +91 98765 43210</p>
            <p>📧 support@khushbooejannat.com</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
