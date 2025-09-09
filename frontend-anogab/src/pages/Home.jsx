// import { useEffect, useState } from "react";

// function Home() {
//   const [loading, setLoading] = useState(true);
//   const [health, setHealth] = useState(null);

//   useEffect(() => {
//     fetch("https://anogab-backend.onrender.com/health")
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("✅ Backend health:", data);
//         setHealth(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("❌ Backend still waking up:", err);
//         setLoading(true); // stay loading until backend responds
//       });
//   }, []);

//   if (loading) {
//     return (
//       <div style={{ textAlign: "center", marginTop: "50px" }}>
//         <h2>⏳ Waking up server...</h2>
//         <p>Please wait, Render backend is starting up</p>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <h1>🚀 Backend is Ready</h1>
//       <pre>{JSON.stringify(health, null, 2)}</pre>
//     </div>
//   );
// }

// export default Home;



import { useEffect, useState } from "react";
import "./Home.css"; // 👈 move the CSS into a separate file

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
    <div className="home-container">
      <h2>A Quiet Place to Be Loud.</h2>
      <div className="subhead">
        <p>
          Whether you're venting, reflecting, or connecting
        </p>
        <p>
           Anogabs gives you the space.
        </p>
      </div>
      <div className="ctn-btns">
        <button className="try-btn">Lets, try</button>
        <button>Learn More</button>
      </div>

    </div>
  );
}

export default Home;
