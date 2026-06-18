import "./Scam.css";

function Scam() {
  return (
    <section className="scam-section">
      <div className="container">
        <div className="scam-box">
          <h2>🚨 Scam Alert</h2>

          <p>
            Beware of fake websites and sellers claiming to sell{" "}
            <b>Khushboo-e-Jannat</b> products. We only sell through our official
            store. Do not trust unauthorized sellers or links.
          </p>

          <ul>
            <li>✔ Always check official website URL</li>
            <li>✔ Never share OTP or personal details</li>
            <li>✔ Avoid discounted fake offers on social media</li>
          </ul>

          <p className="warning">Stay safe. Buy only from trusted sources.</p>
        </div>
      </div>
    </section>
  );
}

export default Scam;
