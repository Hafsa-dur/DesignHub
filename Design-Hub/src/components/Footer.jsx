import { Link } from "react-router-dom";
import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-logo">
          <h2>DesignHub</h2>
          <p>Create. Collaborate. Export.</p>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>

          <Link to="/">Home</Link>
          <Link to="/features">Features</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>

        <div className="footer-contact">
          <h3>Contact</h3>

          <p>support@designhub.com</p>
          <p>+92 300 1234567</p>
          <p>Peshawar, Pakistan</p>
        </div>

      </div>

      <hr />

      <p className="copyright">
        © 2026 DesignHub. All Rights Reserved.
      </p>

    </footer>
  );
}

export default Footer;