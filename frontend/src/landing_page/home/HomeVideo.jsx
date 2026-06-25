import "./HomeVideo.css";

function HomeVideo() {
  return (
    <section className="video-hero">
      <video className="hero-video" autoPlay muted loop playsInline>
        <source src="/homeVideo.mp4" type="video/mp4" />
      </video>

      <div className="video-overlay"></div>

      <div className="video-content">
        <h1>Khushboo-e-Jannat</h1>
        <p>Luxury Attar Collection</p>
      </div>
    </section>
  );
}

export default HomeVideo;
