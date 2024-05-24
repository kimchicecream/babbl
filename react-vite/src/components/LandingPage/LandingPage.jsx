import Footer from "../Footer";
import "./LandingPage.css";

function LandingPage() {
  return (
    <div className="landing-page-container">
      <div className="hero-container">
        <div className="hero-title">
          <h1 id="introducing">Introducing</h1>
          <img src="../../../public/babbl-name.png"></img>
        </div>
        <div className="video-container">
          <video
            src="../../../public/background-video/background-video.mp4"
            className="background-video"
            autoPlay
            muted
            playsInline
            loop
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default LandingPage;
