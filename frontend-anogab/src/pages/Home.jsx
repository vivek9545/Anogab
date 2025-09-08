import { useEffect, useState } from "react";

function Home() {
  const [loading, setLoading] = useState(true);
  const [health, setHealth] = useState(null);

  useEffect(() => {
    fetch("https://anogab-backend.onrender.com/health")
      .then((res) => res.json())
      .then((data) => {
        console.log("✅ Backend health:", data);
        setHealth(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Backend still waking up:", err);
        setLoading(true); // stay loading until backend responds
      });
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>⏳ Waking up server...</h2>
        <p>Please wait, Render backend is starting up</p>
      </div>
    );
  }

  return (
    <div>
      <h1>🚀 Backend is Ready</h1>
      <pre>{JSON.stringify(health, null, 2)}</pre>
    </div>
  );
}

export default Home;
