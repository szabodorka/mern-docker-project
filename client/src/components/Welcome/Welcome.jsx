import "./Welcome.css";
import bull from "../../images/transBull.png";
import Footer from "../Footer/Footer";
import "../Footer/Footer.css";

export default function Welcome() {
  return (
    <div className="header-container">
      <h1 className="header-title">
        <span className="gradient-text">The Ultimate</span> Crypto Portfolio
        Tracker
      </h1>
      <p className="header-subtitle">
        Start effectively managing your entire portfolio with our portfolio
        tracker!
      </p>
      <img className="welcomeLogo" src={bull} alt="Description" />
      <Footer />
    </div>
  );
}
