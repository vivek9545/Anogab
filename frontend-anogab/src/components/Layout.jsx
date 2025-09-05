import Navbar from './Navbar';  // Assuming Navbar is in the same folder
import Sidebar from './Sidebar'; // Assuming Sidebar is in the same folder
import './Layout.css';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      {/* Navbar */}
      <Navbar />

      {/* Main content area with Sidebar */}
      <div className="main-container">
        <div className="sidebar-area">
          <Sidebar />
        </div>
        {/* Content will be rendered here */}
        <div className="content-area">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;

