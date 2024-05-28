import Footer from "../Footer";
import "./LandingPage.css";

function LandingPage() {
  return (
    <div className="landing-page-container">
      <div className="hero-container">
        <div className="hero-title">
          <h5>Now in Beta</h5>
          <h1 id="introducing">Introducing</h1>
          <img src="../../../babbl-name.png"></img>
          <h2>Your new digital hangout.</h2>
        </div>
        <div className="video-container">
          <video
            src="../../../background-video/background-video.mp4"
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
