import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/Features.css";

function Templates() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const instagramTemplates = [
    {
      id: 1,
      title: "Fast Food Menu",
      category: "Menu Design",
      type: "image",
      postUrl: "https://www.instagram.com/fierce__template/"
    },
    {
      id: 2,
      title: "Fish Typography",
      category: "Text Effect",
      type: "image",
      postUrl: "https://www.instagram.com/fierce__template/"
    },
    {
      id: 3,
      title: "3D Light & Shadow",
      category: "Typography",
      type: "image",
      postUrl: "https://www.instagram.com/fierce__template/"
    },
    {
      id: 4,
      title: "Banana Manipulation",
      category: "Creative Design",
      type: "image",
      postUrl: "https://www.instagram.com/fierce__template/"
    },
    {
      id: 5,
      title: "Perfume Ad Promo",
      category: "Product Promotion",
      type: "video",
      postUrl: "https://www.instagram.com/fierce__template/"
    },
    {
      id: 6,
      title: "Wedding Invitation",
      category: "Invitation Cards",
      type: "video",
      postUrl: "https://www.instagram.com/fierce__template/"
    },
    {
      id: 7,
      title: "Solar Eclipse Motion",
      category: "Creative Motion",
      type: "video",
      postUrl: "https://www.instagram.com/fierce__template/"
    }
  ];

  const filteredTemplates = instagramTemplates.filter((template) => {
    if (selectedCategory === "Image") return template.type === "image";
    if (selectedCategory === "Video") return template.type === "video";
    return true;
  });

  return (
    <>
      <Navbar />
      <section className="features-page" style={{ minHeight: "80vh", paddingBottom: "3rem" }}>
        <h1>Design Templates Gallery</h1>
        <p className="features-text">
          Browse our complete collection of static posters and dynamic motion video reels.
        </p>

        <div style={{ marginTop: "2rem" }}>
          {/* Filter Buttons */}
          <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "2rem", flexWrap: "wrap" }}>
            <button
              onClick={() => setSelectedCategory("All")}
              style={{
                padding: "8px 20px",
                borderRadius: "20px",
                border: "none",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "14px",
                backgroundColor: selectedCategory === "All" ? "#E1306C" : "#e0e0e0",
                color: selectedCategory === "All" ? "#fff" : "#333"
              }}
            >
              All Templates ({instagramTemplates.length})
            </button>
            <button
              onClick={() => setSelectedCategory("Image")}
              style={{
                padding: "8px 20px",
                borderRadius: "20px",
                border: "none",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "14px",
                backgroundColor: selectedCategory === "Image" ? "#E1306C" : "#e0e0e0",
                color: selectedCategory === "Image" ? "#fff" : "#333"
              }}
            >
              🖼 Static Posts (4)
            </button>
            <button
              onClick={() => setSelectedCategory("Video")}
              style={{
                padding: "8px 20px",
                borderRadius: "20px",
                border: "none",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "14px",
                backgroundColor: selectedCategory === "Video" ? "#E1306C" : "#e0e0e0",
                color: selectedCategory === "Video" ? "#fff" : "#333"
              }}
            >
              🎬 Video Reels (3)
            </button>
          </div>

          {/* Templates Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px" }}>
            {filteredTemplates.map((template) => (
              <div
                key={template.id}
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "12px",
                  padding: "16px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                  display: "flex",
                  flexDirection: "column",
                  justify: "space-between",
                  textAlign: "left",
                  border: "1px solid #eee"
                }}
              >
                <div>
                  <div
                    style={{
                      background: template.type === "video" 
                        ? "linear-gradient(135deg, #f09433 0%, #bc1888 100%)" 
                        : "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
                      color: template.type === "video" ? "#fff" : "#333",
                      padding: "8px 12px",
                      borderRadius: "6px",
                      fontWeight: "bold",
                      fontSize: "12px",
                      display: "inline-block",
                      marginBottom: "12px"
                    }}
                  >
                    {template.type === "video" ? "🎬 " + template.category : "🖼 " + template.category}
                  </div>
                  <h3 style={{ fontSize: "16px", marginBottom: "6px", color: "#222" }}>{template.title}</h3>
                  <p style={{ fontSize: "12px", color: "#666", marginBottom: "16px" }}>
                    {template.type === "video" ? "Instagram Motion Reel" : "Instagram Design Poster"}
                  </p>
                </div>

                <a
                  href={template.postUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "center",
                    padding: "9px 0",
                    backgroundColor: "#E1306C",
                    color: "#fff",
                    borderRadius: "8px",
                    textDecoration: "none",
                    fontSize: "13px",
                    fontWeight: "600"
                  }}
                >
                  View on Instagram ↗
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Templates;