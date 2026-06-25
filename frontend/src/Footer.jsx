import "./Footer.css";

function Footer() {
  return (
    <footer className="custom-footer py-5 px-3 px-md-5">
      <div className="container-fluid max-width-container">
        <div className="row g-4">
          {/* Column 1: Logo & Contact */}
          <div className="col-12 col-md-6 col-lg-3 footer-col">
            <h2 className="footer-logo mb-3">
              Khushboo-e-jannat<span className="trademark-sym">®</span>
            </h2>
            <div className="contact-info d-flex flex-column gap-2 mb-3">
              <a href="tel:+918885978692" className="footer-link">
                <span className="me-2">📞</span> +91 8885978692
              </a>
              <a href="mailto:info@adilqadri.com" className="footer-link">
                <span className="me-2">✉</span> info@khushbooejannat.com
              </a>
            </div>
            {/* Social Icons */}
            <div className="social-icons d-flex gap-2">
              <a href="#" className="icon-circle">
                f
              </a>
              <a href="#" className="icon-circle">
                📸
              </a>
              <a href="#" className="icon-circle">
                ▶
              </a>
            </div>
          </div>

          {/* Column 2: Categories */}
          <div className="col-12 col-md-6 col-lg-3 footer-col">
            <h3 className="column-title mb-3">Categories</h3>
            <ul className="list-unstyled footer-list">
              <li>
                <a href="#" className="footer-link">
                  Get 3 Attars at ₹899
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Get 3 Perfumes at ₹899
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Attar
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Perfume Spray
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Body Spray
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Royal Attar Perfume
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Bakhoor
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Incense Sticks
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  New Arrival
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Track Order
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Return Your Order
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Store Locator
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Rewards
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div className="col-12 col-md-6 col-lg-3 footer-col">
            <h3 className="column-title mb-3">Quick Links</h3>
            <ul className="list-unstyled footer-list">
              <li>
                <a href="#" className="footer-link">
                  Track Order
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Account
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Store Locator
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Refunds & Cancellations Policy
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Return Your Order
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="col-12 col-md-6 col-lg-3 footer-col">
            <h3 className="column-title mb-3">Newsletter</h3>
            <p className="newsletter-text mb-3">
              A short sentence describing what someone will receive by
              subscribing
            </p>
            {/* Custom Search/Input Box */}
            <div className="newsletter-input-wrapper d-flex align-items-center">
              <input
                type="email"
                placeholder="Enter Your Email"
                className="form-control border-0 bg-transparent newsletter-input shadow-none"
              />
              <button className="btn newsletter-btn d-flex align-items-center justify-content-center">
                ➔
              </button>
            </div>
            <p className="newsletter-text mt-3">Developed By ~ Ali Sheikh</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
