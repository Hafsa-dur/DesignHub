import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";
import UploadDesign from "../components/UploadDesign";

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

  const handleTeamCollaborationClick = (e) => {
    e.preventDefault();
    setSidebarOpen(false);
    navigate("/features?feature=collaboration");
  };

  const handleDashboardClick = () => {
    setActiveTab("dashboard");
    setSidebarOpen(false);
  };

  const handleSettingsClick = () => {
    setActiveTab("settings");
    setSidebarOpen(false);
  };

  const instagramTemplates = [
    {
      id: 1,
      title: "Fast Food Menu",
      category: "Menu Design",
      type: "image",
      postUrl: "https://www.instagram.com/fierce__template/",
    },
    {
      id: 2,
      title: "Fish Typography",
      category: "Text Effect",
      type: "image",
      postUrl: "https://www.instagram.com/fierce__template/",
    },
    {
      id: 3,
      title: "3D Light & Shadow",
      category: "Typography",
      type: "image",
      postUrl: "https://www.instagram.com/fierce__template/",
    },
    {
      id: 4,
      title: "Banana Manipulation",
      category: "Creative Design",
      type: "image",
      postUrl: "https://www.instagram.com/fierce__template/",
    },
    {
      id: 5,
      title: "Perfume Ad Promo",
      category: "Product Promotion",
      type: "video",
      postUrl: "https://www.instagram.com/fierce__template/",
    },
    {
      id: 6,
      title: "Wedding Invitation",
      category: "Invitation Cards",
      type: "video",
      postUrl: "https://www.instagram.com/fierce__template/",
    },
    {
      id: 7,
      title: "Solar Eclipse Motion",
      category: "Creative Motion",
      type: "video",
      postUrl: "https://www.instagram.com/fierce__template/",
    },
  ];

  return (
    <div className="dashboard">

      {/* =========================
          SIDEBAR
      ========================= */}
      <aside
        className={`dashboard-sidebar ${
          sidebarOpen ? "open" : ""
        }`}
      >
        <div className="sidebar-logo">
          <h2>DesignHub</h2>
        </div>

        <nav className="sidebar-menu">

          <Link
            to="/dashboard"
            className={
              activeTab === "dashboard" ? "active" : ""
            }
            onClick={handleDashboardClick}
          >
            Dashboard
          </Link>

          <Link
            to="/features"
            onClick={() => setSidebarOpen(false)}
          >
            Features
          </Link>

          <Link
            to="/templates"
            onClick={() => setSidebarOpen(false)}
          >
            Templates
          </Link>

          <a
            href="/features?feature=collaboration"
            onClick={handleTeamCollaborationClick}
          >
            Team Collaboration
          </a>

          {/* SETTINGS */}
          <button
            className={`settings-link ${
              activeTab === "settings" ? "active" : ""
            }`}
            onClick={handleSettingsClick}
          >
            Settings
          </button>

        </nav>

        <div className="sidebar-bottom">
          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </aside>

      {/* =========================
          MAIN AREA
      ========================= */}
      <main className="dashboard-main">

        {/* TOPBAR */}
        <header className="dashboard-topbar">

          <button
            className="menu-btn"
            onClick={() =>
              setSidebarOpen(!sidebarOpen)
            }
          >
            ☰
          </button>

          <div className="topbar-title">
            <h1>
              {activeTab === "dashboard"
                ? "Dashboard"
                : "Settings"}
            </h1>

            <p>
              {activeTab === "dashboard"
                ? "Manage your designs and projects"
                : "Manage your account preferences"}
            </p>
          </div>

          <div className="topbar-profile">
            <div className="profile-avatar">
              D
            </div>

            <span>Designer</span>
          </div>

        </header>

        {/* CONTENT */}
        <section className="dashboard-content">

          {/* =========================
              DASHBOARD TAB
          ========================= */}
          {activeTab === "dashboard" && (
            <>
              <div className="welcome-section">
                <h2>Welcome back! 👋</h2>

                <p>
                  Start creating beautiful designs and
                  manage your projects.
                </p>
              </div>

              {/* STATS */}
              <div className="dashboard-stats">

                <div className="stat-card">
                  <div className="stat-icon">
                    🎨
                  </div>

                  <div>
                    <h3>12</h3>
                    <p>My Designs</p>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon">
                    📁
                  </div>

                  <div>
                    <h3>7</h3>
                    <p>Templates</p>
                  </div>
                </div>

                <div
                  className="stat-card"
                  onClick={handleTeamCollaborationClick}
                  style={{ cursor: "pointer" }}
                >
                  <div className="stat-icon">
                    👥
                  </div>

                  <div>
                    <h3>5</h3>
                    <p>Team Members</p>
                  </div>
                </div>

              </div>

              {/* FEATURED TEMPLATES */}
              <section className="recent-section">

                <div className="section-header">

                  <div>
                    <h2>Featured Templates</h2>

                    <p>
                      Your latest designs from Instagram
                    </p>
                  </div>

                  <Link to="/templates">
                    <button className="create-btn">
                      View All Templates ↗
                    </button>
                  </Link>

                </div>

                <div className="design-grid">

                  {instagramTemplates.map(
                    (template) => (
                      <div
                        key={template.id}
                        className="design-card"
                      >

                        <div
                          className="design-preview"
                          style={{
                            background:
                              template.type === "video"
                                ? "linear-gradient(135deg, #f09433 0%, #bc1888 100%)"
                                : "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
                            color:
                              template.type === "video"
                                ? "#fff"
                                : "#333",
                          }}
                        >
                          {template.type === "video"
                            ? "🎬 "
                            : "🖼 "}
                          {template.category}
                        </div>

                        <div className="design-info">

                          <h3>
                            {template.title}
                          </h3>

                          <p>
                            {template.type === "video"
                              ? "Instagram Video Reel"
                              : "Instagram Poster"}
                          </p>

                          <a
                            href={template.postUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="instagram-btn"
                          >
                            View on Instagram ↗
                          </a>

                        </div>

                      </div>
                    )
                  )}

                </div>

              </section>

              {/* UPLOAD DESIGN */}
              <div className="upload-section">
                <UploadDesign />
              </div>

            </>
          )}

          {/* =========================
              SETTINGS TAB
          ========================= */}
          {activeTab === "settings" && (
            <div className="settings-panel">

              <h2>🔒 Account Settings</h2>

              <p className="settings-description">
                Manage your profile security and app
                preferences.
              </p>

              <div className="settings-options">

                <div className="setting-item">
                  <span>
                    <strong>
                      Email Notifications:
                    </strong>
                    {" "}
                    Receive updates on shared projects
                  </span>

                  <input
                    type="checkbox"
                    defaultChecked
                  />
                </div>

                <div className="setting-item">
                  <span>
                    <strong>
                      Dark Mode Appearance:
                    </strong>
                    {" "}
                    Enable dark interface theme
                  </span>

                  <input type="checkbox" />
                </div>

                <button
                  className="reset-password-btn"
                  onClick={() =>
                    alert(
                      "Password reset link successfully sent to your registered email!"
                    )
                  }
                >
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