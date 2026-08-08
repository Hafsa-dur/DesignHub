import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";
import UploadDesign from "../components/UploadDesign";

// Import Firebase Auth and SignOut
import { auth } from "../firebase/firebase";
import { signOut } from "firebase/auth";

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard"); 
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Successfully logged out! 👋");
      navigate("/login");
    } catch (error) {
      console.error("Logout Error:", error);
      alert("Failed to logout. Please try again.");
    }
  };

  // Yeh function seedha URL parameter ke sath Features page par le jayega aur collaboration khol dega
  const handleTeamCollaborationClick = (e) => {
    e.preventDefault();
    navigate("/features?feature=collaboration");
  };

  const instagramTemplates = [
    { id: 1, title: "Fast Food Menu", category: "Menu Design", type: "image", postUrl: "https://www.instagram.com/fierce__template/" },
    { id: 2, title: "Fish Typography", category: "Text Effect", type: "image", postUrl: "https://www.instagram.com/fierce__template/" },
    { id: 3, title: "3D Light & Shadow", category: "Typography", type: "image", postUrl: "https://www.instagram.com/fierce__template/" },
    { id: 4, title: "Banana Manipulation", category: "Creative Design", type: "image", postUrl: "https://www.instagram.com/fierce__template/" },
    { id: 5, title: "Perfume Ad Promo", category: "Product Promotion", type: "video", postUrl: "https://www.instagram.com/fierce__template/" },
    { id: 6, title: "Wedding Invitation", category: "Invitation Cards", type: "video", postUrl: "https://www.instagram.com/fierce__template/" },
    { id: 7, title: "Solar Eclipse Motion", category: "Creative Motion", type: "video", postUrl: "https://www.instagram.com/fierce__template/" }
  ];

  return (
    <div className="dashboard">
      <aside className={`dashboard-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-logo">
          <h2>DesignHub</h2>
        </div>

        <nav className="sidebar-menu">
          <Link to="/dashboard" className={activeTab === "dashboard" ? "active" : ""} onClick={() => setActiveTab("dashboard")}>
            Dashboard
          </Link>
          <Link to="/features">Features</Link>
          <Link to="/templates">Templates</Link>

          {/* Team Collaboration Link */}
          <a href="/features?feature=collaboration" onClick={handleTeamCollaborationClick}>
            Team Collaboration
          </a>

          <button 
            onClick={() => setActiveTab("settings")} 
            style={{ 
              display: "block", width: "100%", textAlign: "left",
              background: activeTab === "settings" ? "rgba(225, 48, 108, 0.1)" : "transparent",
              border: "none", padding: "12px 16px",
              color: activeTab === "settings" ? "#E1306C" : "#625d5d", 
              cursor: "pointer", fontSize: "15px", fontWeight: "600",
              borderRadius: "6px", marginTop: "5px", transition: "all 0.3s ease"
            }}
          >
            Settings
          </button>
        </nav>

        <div className="sidebar-bottom">
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-topbar">
          <button className="menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>☰</button>
          <div className="topbar-title">
            <h1>{activeTab === "dashboard" ? "Dashboard" : "Settings"}</h1>
            <p>{activeTab === "dashboard" ? "Manage your designs and projects" : "Manage your account preferences"}</p>
          </div>
          <div className="topbar-profile">
            <div className="profile-avatar">D</div>
            <span>Designer</span>
          </div>
        </header>

        <section className="dashboard-content">
          {activeTab === "dashboard" && (
            <>
              <div className="welcome-section">
                <h2>Welcome back! 👋</h2>
                <p>Start creating beautiful designs and manage your projects.</p>
              </div>

              <div className="dashboard-stats" style={{ marginBottom: "2rem" }}>
                <div className="stat-card">
                  <div className="stat-icon">🎨</div>
                  <div><h3>12</h3><p>My Designs</p></div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">📁</div>
                  <div><h3>7</h3><p>Templates</p></div>
                </div>
                <div className="stat-card" onClick={handleTeamCollaborationClick} style={{ cursor: "pointer" }}>
                  <div className="stat-icon">👥</div>
                  <div><h3>5</h3><p>Team Members</p></div>
                </div>
              </div>

              <section className="recent-section" style={{ marginBottom: "2.5rem" }}>
                <div className="section-header">
                  <div>
                    <h2>Featured Templates</h2>
                    <p>Your latest designs from Instagram</p>
                  </div>
                  <Link to="/templates">
                    <button className="create-btn">View All Templates ↗</button>
                  </Link>
                </div>

                <div className="design-grid">
                  {instagramTemplates.map((template) => (
                    <div key={template.id} className="design-card" style={{ padding: "15px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                      <div className="design-preview" style={{ background: template.type === "video" ? "linear-gradient(135deg, #f09433 0%, #bc1888 100%)" : "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)", color: template.type === "video" ? "#fff" : "#333", fontWeight: "bold", borderRadius: "8px", fontSize: "13px" }}>
                        {template.type === "video" ? "🎬 " + template.category : "🖼 " + template.category}
                      </div>
                      <div className="design-info" style={{ marginTop: "10px" }}>
                        <h3 style={{ fontSize: "15px", marginBottom: "4px" }}>{template.title}</h3>
                        <p style={{ fontSize: "12px", color: "#666", marginBottom: "12px" }}>{template.type === "video" ? "Instagram Video Reel" : "Instagram Poster"}</p>
                        <a href={template.postUrl} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", width: "100%", textAlign: "center", padding: "8px 0", backgroundColor: "#E1306C", color: "#fff", borderRadius: "6px", textDecoration: "none", fontSize: "12px", fontWeight: "600" }}>
                          View on Instagram ↗
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <div style={{ marginTop: "2rem" }}>
                <UploadDesign />
              </div>
            </>
          )}

          {activeTab === "settings" && (
            <div className="settings-panel" style={{ padding: "24px", background: "#fff", borderRadius: "16px", boxShadow: "0 6px 18px rgba(0,0,0,0.08)" }}>
              <h2 style={{ color: "#111827", fontWeight: "700" }}>🔒 Account Settings</h2>
              <p style={{ color: "#374151", fontSize: "14px", marginBottom: "1.5rem", fontWeight: "500" }}>Manage your profile security and app preferences.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px", background: "#f9f9f9", borderRadius: "8px" }}>
                  <span><strong>Email Notifications:</strong> Receive updates on shared projects</span>
                  <input type="checkbox" defaultChecked style={{ width: "18px", height: "18px", cursor: "pointer" }} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px", background: "#f9f9f9", borderRadius: "8px" }}>
                  <span><strong>Dark Mode Appearance:</strong> Enable dark interface theme</span>
                  <input type="checkbox" style={{ width: "18px", height: "18px", cursor: "pointer" }} />
                </div>
                <button onClick={() => alert("Password reset link successfully sent to your registered email!")} style={{ padding: "12px", backgroundColor: "#333", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold", marginTop: "10px" }}>
                  Reset Password 🔑
                </button>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Dashboard;