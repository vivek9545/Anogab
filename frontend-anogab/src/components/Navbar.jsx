import { NavLink } from 'react-router-dom';  // Import NavLink
import './Navbar.css';
import logo from '../assets/Anogab.png';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} className="logoimg" alt="AG" />
        AnoGab
      </div>
      <div className="nav-links">
        {/* Use NavLink instead of Link for active link styling */}
        <NavLink 
          to="/services" 
          className={({ isActive }) => isActive ? 'active-link' : ''}  // Add active class if route is active
        >
          Hi, User
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
