
import { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import './Layout.css';

const Layout = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="layout">
      {/* Navbar with toggle */}
      <Navbar toggleSidebar={toggleSidebar} />

      {/* Optional overlay on mobile */}
      {isSidebarOpen && <div className="overlay" onClick={closeSidebar} />}

      <div className="main-container">
        {/* Sidebar: visible or slide-in depending on screen size */}
        <div className={`sidebar-area ${isSidebarOpen ? 'open' : ''}`}>
          <Sidebar closeSidebar={closeSidebar} />
        </div>

        <div className="content-area">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;

