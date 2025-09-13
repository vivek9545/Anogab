import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import Chat from '../pages/Chat';
import Chatroom from '../pages/Chatroom';
import Room from '../pages/Room';
import { motion } from 'framer-motion';

function RoutesWithAnimation() {
  const location = useLocation();

  return (
    <Routes location={location} key={location.key}>
      <Route 
        path="/" 
        element={<Navigate to="/home" replace />} 
      />
      <Route
        path="/home"
        element={<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><Home /></motion.div>}
      />
      <Route
        path="/chat"
        element={<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><Chat /></motion.div>}
      />
      <Route
        path="/about"
        element={<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><About /></motion.div>}
      />
      <Route
        path="/chatroom"
        element={<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><Chatroom /></motion.div>}
      />
      <Route
        path="/room/:roomId"
        element={<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><Room /></motion.div>}
      />
    </Routes>
  );
}

export default RoutesWithAnimation;
