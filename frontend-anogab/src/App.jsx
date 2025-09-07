

// App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Chatroom from './pages/Chatroom';
import Room from './pages/Room';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/home" element={<Home />} /> */}
          <Route path="/chatroom" element={<Chatroom />} />
          <Route path="/about" element={<About />} />

          <Route path="/room/:roomId" element={<Room />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;


