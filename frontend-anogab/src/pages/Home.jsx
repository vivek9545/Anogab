import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "./Home.css";

function Home() {
  const [loading, setLoading] = useState(true);
  const [health, setHealth] = useState(null);
  const [particles, setParticles] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    // Generate floating particle positions only once
    const initialParticles = [...Array(20)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 5}s`,
      animationDuration: `${3 + Math.random() * 4}s`,
    }));
    setParticles(initialParticles);

    // Fetch backend health
    fetch("https://anogab-backend.onrender.com/health")
      .then((res) => res.json())
      .then((data) => {
        console.log("✅ Backend health:", data);
        setHealth(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Backend still waking up:", err);
        setLoading(true);
      });
  }, []);

  return (
    <div className="home-wrapper">
      {/* Background blobs */}
      <div className="background-blobs">
        <div className="blob teal"></div>
        <div className="blob blue delay-1"></div>
        <div className="blob purple delay-2"></div>
      </div>

      {/* Floating particles */}
      <div className="floating-particles">
        {particles.map((particle, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: particle.left,
              top: particle.top,
              animationDelay: particle.animationDelay,
              animationDuration: particle.animationDuration,
            }}
          >
            <div className="dot"></div>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="home-container">
        <h2>A Quiet Place to Be Loud.</h2>
        <div className="subhead">
          <p>Whether you're venting, reflecting, or connecting</p>
          <p>Anogab gives you the space.</p>
        </div>
       <div className="ctn-btns">
          <button className="try-btn" onClick={() => navigate('/chat')}>
            Lets, try
          </button>
          <button className="learn-btn" onClick={() => navigate('/about')}>
            Learn More
          </button>
        </div>
      </div>
      
        {/* Server status message (always takes up space) */}
        <div className="server-status-wrapper">
          {loading ? (
            <div className="server-status">
              ⏳ Connecting to server... Please wait.
            </div>
          ) : null}
        </div>
    </div>
  );
}

export default Home;
