import "../styles/FeaturesSection.css";

function FeaturesSection() {
  return (
    <section className="features">

      <h2>Why Choose DesignHub?</h2>

      <p className="subtitle">
        Everything you need to create stunning designs in one place.
      </p>

      <div className="cards">

        <div className="card">
          <h3>🎨 Design Templates</h3>
          <p>
            Access hundreds of ready-made professional templates.
          </p>
        </div>

        <div className="card">
          <h3>📤 Export Designs</h3>
          <p>
            Download your designs in PNG, JPG and PDF formats.
          </p>
        </div>

        <div className="card">
          <h3>👥 Team Collaboration</h3>
          <p>
            Work together with your team on the same project.
          </p>
        </div>

        <div className="card">
          <h3>☁ Cloud Storage</h3>
          <p>
            Save your projects securely and access them anytime.
          </p>
        </div>

      </div>

    </section>
  );
}

export default FeaturesSection;