
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/Anogab.png';

const Navbar = ({ toggleSidebar }) => {
  return (
    <nav className="navbar">
     
      <NavLink to="/home" className="logo">
        <img src={logo} className="logoimg" alt="AG" />
        AnoGab
      </NavLink>

      <div className="nav-links">
        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? 'active-link' : '')}
        >
          Hi, User
        </NavLink>
        {/* Hamburger icon for mobile */}
        <button className="burger" onClick={toggleSidebar}>
          &#9776; {/* Unicode for ☰ */}
        </button>
      </div>

      
    </nav>
  );
};

export default Navbar;
