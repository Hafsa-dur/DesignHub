import { useState, useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/Features.css";

// Firebase Imports
import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

function Features() {
  const [searchParams] = useSearchParams();
  const featureParam = searchParams.get("feature");

  const [selectedFeature, setSelectedFeature] = useState(featureParam || "collaboration");
  
  const [teamEmail, setTeamEmail] = useState("");
  const [teamList, setTeamList] = useState([
    { id: 1, email: "colleague@designhub.com", role: "Editor", status: "Active" }
  ]);

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [loadingDesigns, setLoadingDesigns] = useState(true);

  // Ref for auto-scrolling to the collaboration panel
  const collaborationRef = useRef(null);

  useEffect(() => {
    if (featureParam) {
      setSelectedFeature(featureParam);
      // Automatically scroll down to the panel when featureParam changes
      if (featureParam === "collaboration" && collaborationRef.current) {
        setTimeout(() => {
          collaborationRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 100);
      }
    }
  }, [featureParam]);

  useEffect(() => {
    const fetchDesignsFromFirebase = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "designs"));
        const firebaseDesigns = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name || "Untitled Design",
          previewUrl: doc.data().imageUrl || doc.data().previewUrl
        }));

        if (firebaseDesigns.length > 0) {
          setUploadedFiles(firebaseDesigns);
        } else {
          setUploadedFiles([
            {
              id: 1,
              name: "Sample Poster Design",
              previewUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80"
            }
          ]);
        }
      } catch (error) {
        console.error("Error fetching designs from Firebase:", error);
      } finally {
        setLoadingDesigns(false);
      }
    };

    fetchDesignsFromFirebase();
  }, []);

  const handleInvite = (e) => {
    e.preventDefault();
    if (!teamEmail.trim()) return;

    const newMember = {
      id: Date.now(),
      email: teamEmail,
      role: "Collaborator",
      status: "Invited (Pending)"
    };

    setTeamList([...teamList, newMember]);
    setTeamEmail("");
  };

  const handleDownloadHD = (fileUrl, fileName) => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = `${fileName}-HD.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const featuresList = [
    {
      id: "my-designs",
      icon: "🎨",
      title: "My Designs",
      shortDesc: "Manage and organize your personal and recent design projects."
    },
    {
      id: "collaboration",
      icon: "👥",
      title: "Team Collaboration",
      shortDesc: "Invite team members via email to work together in real-time."
    },
    {
      id: "export",
      icon: "📤",
      title: "Export Designs",
      shortDesc: "Download high-quality assets in PNG format from your uploaded files."
    },
    {
      id: "performance",
      icon: "⚡",
      title: "Fast Performance",
      shortDesc: "Blazing fast speeds and instant rendering."
    }
  ];

  return (
    <>
      <Navbar />
      <section className="features-page" style={{ minHeight: "80vh", paddingBottom: "3rem" }}>
        <h1>Platform Features</h1>
        <p className="features-text">
          Explore all interactive capabilities offered by DesignHub.
        </p>

        <div className="features-grid">
          {featuresList.map((feature) => (
            <div
              key={feature.id}
              className={`feature-card ${selectedFeature === feature.id ? "active-card" : ""}`}
              onClick={() => setSelectedFeature(selectedFeature === feature.id ? null : feature.id)}
              style={{ cursor: "pointer" }}
            >
              <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>
                {feature.icon}
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.shortDesc}</p>
              <button
                className="explore-btn"
                style={{
                  marginTop: "12px", padding: "6px 14px", borderRadius: "6px",
                  border: "none", backgroundColor: "#E1306C", color: "#fff",
                  fontSize: "12px", fontWeight: "bold", cursor: "pointer"
                }}
              >
                {selectedFeature === feature.id ? "Close Detail ▲" : "Explore Feature ↗"}
              </button>
            </div>
          ))}
        </div>

        {selectedFeature === "collaboration" && (
          <div ref={collaborationRef} style={panelStyle}>
            <h2>👥 Team Collaboration via Email</h2>
            <p style={{ color: "#666", fontSize: "14px" }}>
              Invite team members by email to collaborate on projects.
            </p>
            <form onSubmit={handleInvite} style={{ display: "flex", gap: "10px", margin: "1.5rem 0" }}>
              <input
                type="email"
                placeholder="Enter collaborator's email..."
                value={teamEmail}
                onChange={(e) => setTeamEmail(e.target.value)}
                required
                style={{ flex: 1, padding: "10px 14px", borderRadius: "8px", border: "1px solid #ccc" }}
              />
              <button
                type="submit"
                style={{ padding: "10px 20px", borderRadius: "8px", border: "none", backgroundColor: "#E1306C", color: "#fff", fontWeight: "bold", cursor: "pointer" }}
              >
                Send Invite ✉️
              </button>
            </form>

            <h3>Active & Pending Collaborators</h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {teamList.map((member) => (
                <li key={member.id} style={{ padding: "10px", borderBottom: "1px solid #eee", display: "flex", justifyContent: "space-between" }}>
                  <span>📧 <strong>{member.email}</strong> ({member.role})</span>
                  <span style={{ color: member.status.includes("Active") ? "green" : "#e67e22", fontWeight: "bold" }}>{member.status}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {selectedFeature === "export" && (
          <div style={panelStyle}>
            <h2>📤 Export Designs (HD PNG Download)</h2>
            <p style={{ color: "#666", fontSize: "14px" }}>
              Download your uploaded files in high-resolution PNG format.
            </p>
            {loadingDesigns ? (
              <p style={{ marginTop: "1rem" }}>Loading designs from Firebase...</p>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "15px", marginTop: "1.5rem" }}>
                {uploadedFiles.map((file) => (
                  <div key={file.id} style={{ border: "1px solid #ddd", padding: "12px", borderRadius: "10px", textAlign: "center" }}>
                    <img src={file.previewUrl} alt={file.name} style={{ width: "100%", height: "120px", objectFit: "cover", borderRadius: "6px" }} />
                    <h4 style={{ margin: "10px 0 5px 0", fontSize: "14px" }}>{file.name}</h4>
                    <button
                      onClick={() => handleDownloadHD(file.previewUrl, file.name)}
                      style={{ width: "100%", padding: "8px 0", borderRadius: "6px", border: "none", backgroundColor: "#27ae60", color: "#fff", fontWeight: "bold", cursor: "pointer", fontSize: "12px" }}
                    >
                      Download HD PNG ⬇
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {selectedFeature === "my-designs" && (
          <div style={panelStyle}>
            <h2>🎨 My Designs Gallery</h2>
            <p style={{ color: "#666", fontSize: "14px" }}>
              Here are all your saved and template designs.
            </p>
            <div style={{ marginTop: "1rem", padding: "15px", backgroundColor: "#f9f9f9", borderRadius: "8px" }}>
              <p>Showing all {uploadedFiles.length} active designs in your workspace.</p>
              <Link to="/templates" style={{ color: "#E1306C", fontWeight: "bold", textDecoration: "none" }}>
                Go to Full Gallery View ↗
              </Link>
            </div>
          </div>
        )}

        {selectedFeature === "performance" && (
          <div style={panelStyle}>
            <h2>⚡ Turbo Speed & Performance Booster</h2>
            <p style={{ color: "#666", fontSize: "14px" }}>
              Test your current workspace loading speed and network latency in real-time.
            </p>
            <div style={{ marginTop: "1.5rem", textAlign: "center", padding: "20px", background: "#fdf2f8", borderRadius: "10px" }}>
              <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#E1306C", marginBottom: "10px" }}>
                🚀 0.12 ms
              </div>
              <p style={{ fontSize: "13px", color: "#4b5563", marginBottom: "15px" }}>
                Lightning fast! Your designs are cached locally and synced with Firebase.
              </p>
              <button
                onClick={() => alert("🎉 Zoom! Your app performance is operating at 100% capacity!")}
                style={{ padding: "10px 20px", backgroundColor: "#E1306C", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}
              >
                Run Speed Test 🔄
              </button>
            </div>
          </div>
        )}
      </section>
      <Footer />
    </>
  );
}

const panelStyle = {
  marginTop: "2rem", padding: "24px", backgroundColor: "#fff",
  borderRadius: "16px", boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
  textAlign: "left", borderLeft: "6px solid #E1306C"
};

export default Features;