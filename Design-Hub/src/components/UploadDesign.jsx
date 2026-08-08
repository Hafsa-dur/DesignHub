import { useState } from "react";
import { db, auth } from "../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";

function UploadDesign() {
  const [designName, setDesignName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault(); // 👈 Isse page refresh ruk jayega!

    if (!designName || !imageUrl) {
      alert("Please enter both Design Name and Image URL!");
      return;
    }

    try {
      setLoading(true);

      // Firestore Database mein data save ho raha hai
      await addDoc(collection(db, "designs"), {
        name: designName,
        imageUrl: imageUrl,
        userId: auth.currentUser ? auth.currentUser.uid : "anonymous",
        createdAt: new Date(),
      });

      alert("Design saved successfully! 🎉");
      setDesignName("");
      setImageUrl("");
    } catch (error) {
      console.error("Error saving design: ", error);
      alert("Failed to save design. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "30px", maxWidth: "500px", margin: "auto" }}>
      <h2>Upload New Design</h2>
      
      <form onSubmit={handleUpload} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <div>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
            Design Title:
          </label>
          <input
            type="text"
            placeholder="e.g. Modern UI Dashboard"
            value={designName}
            onChange={(e) => setDesignName(e.target.value)}
            required
            style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
          />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
            Image URL (Link):
          </label>
          <input
            type="url"
            placeholder="Paste image URL here (https://...)"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
            style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "12px",
            backgroundColor: "#EC4899",
            color: "white",
            border: "none",
            borderRadius: "6px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          {loading ? "Saving Design..." : "Save Design"}
        </button>
      </form>
    </div>
  );
}

export default UploadDesign;