
// import Navbar from './Navbar.jsx'
// import Chat from './Chat.jsx'

// export default function App() {
//   return (
//     <div className='app-container'>
//       <Navbar />
//       <Chat />
//     </div>
//   );
// }


// App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Chatroom from './pages/Chatroom';
import Croom from './pages/Croom';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/chatroom" element={<Chatroom />} />
          <Route path="/about" element={<About />} />

          <Route path="/room/:roomId" element={<Croom />} />
        </Routes>
      </Layout>
    </BrowserRouter>
    
    // <Croom/>

    // <BrowserRouter>
    //     <Routes>
    //       {/* Group chat rooms (e.g. /room/123) */}
    //       <Route path="/room/:roomId" element={<Croom />} />
    //     </Routes>
    // </BrowserRouter>
  );
}

export default App;


