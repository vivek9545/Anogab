
import { NavLink } from 'react-router-dom';
import './Sidebar.css';
import HomeSvg from '../assets/Home.svg?react';
import ChatSvg from '../assets/Chat.svg?react';
import AboutSvg from '../assets/About.svg?react';
import RoomSvg from '../assets/Room.svg?react';

const Sidebar = ({ closeSidebar }) => {
  return (
    <div className="sidebar">
      {/* Close button for mobile */}
      <button className="close-btn" onClick={closeSidebar}>×</button>

      <NavLink to="/home" className={({ isActive }) => isActive ? 'active' : ''}>
        <HomeSvg className='homesvg' />
        Home
      </NavLink>
      <NavLink to="/chat" className={({ isActive }) => isActive ? 'active' : ''}>
        <ChatSvg />
        Chat 
      </NavLink>
      <NavLink to="/chatroom"  className={({ isActive }) => `roomelement ${isActive ? 'active' : ''}`}>
      
        <RoomSvg className='roomsvg' />
        Chat Room
      </NavLink>
      <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>
        <AboutSvg />
        About Us
      </NavLink>
    </div>
  );
};

export default Sidebar;
