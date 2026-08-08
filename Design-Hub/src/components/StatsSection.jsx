import "../styles/StatsSection.css";

function StatsSection() {
  return (
    <section className="stats">

      <div className="stat-card">
        <h2>10K+</h2>
        <p>Active Users</p>
      </div>

      <div className="stat-card">
        <h2>500+</h2>
        <p>Premium Templates</p>
      </div>

      <div className="stat-card">
        <h2>25+</h2>
        <p>Countries</p>
      </div>

      <div className="stat-card">
        <h2>4.9★</h2>
        <p>User Rating</p>
      </div>

    </section>
  );
}

export default StatsSection;