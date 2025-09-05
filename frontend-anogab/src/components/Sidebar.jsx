import { NavLink } from 'react-router-dom';  // Import NavLink instead of Link
import './Sidebar.css';
import HomeSvg from '../assets/Home.svg?react';
import RoomSvg from '../assets/Room.svg?react';
import AboutSvg from '../assets/About.svg?react';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <NavLink 
        to="/home" 
        className={({ isActive }) => isActive ? 'active' : ''}  // Apply 'active' class when active
      >
        <HomeSvg className='icon homesvg' />
        Home
      </NavLink >
      <NavLink 
        to="/chatroom" 
        className={({ isActive }) => isActive ? 'active' : ''}
      >
        <RoomSvg />
        Chat Room
      </NavLink>
      <NavLink 
        to="/about" 
        className={({ isActive }) => isActive ? 'active' : ''}
      >
        <AboutSvg />
        About Us
      </NavLink>
    </div>
  );
};

export default Sidebar;
