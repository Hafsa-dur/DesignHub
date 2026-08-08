import { Link } from "react-router-dom";
import "../styles/Home.css";

function Hero() {
  return (
    <section className="hero">

      <div className="hero-content">

        <h1>Create Beautiful Designs with DesignHub</h1>

        <p>
          DesignHub is a modern SaaS platform where you can create,
          manage, collaborate and export professional designs easily.
        </p>

        <div className="hero-buttons">

          <Link to="/signup" className="primary-btn">
            Get Started
          </Link>

          <Link to="/features" className="secondary-btn">
            Learn More
          </Link>

        </div>

      </div>

      <div className="hero-image">

        <img
          src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=700"
          alt="Hero"
        />

      </div>

    </section>
  );
}

export default Hero;