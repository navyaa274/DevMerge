import React, { useState } from 'react';
import {ReactComponent as svgLogo} from "../../svgs/sidebar-left-svgrepo-com.svg";
import "../../styles/editor.css";
import "../../svgs/notification-bing-svgrepo-com.svg";
import { Routes, Route, Link } from "react-router-dom";
import Chatbot from "../../pages/chatBot/index.jsx"; // Import the Chatbot component

const Navbar = ({ toggleSidebar, runCode, toggleChatbot }) => {
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [isChatbotVisible, setChatbotVisible] = useState(false); // Chatbot visibility state

  

  return (
    <div className="navbar">
      <button onClick={toggleSidebar} className="up-svg-button flex">
        <img src={svgLogo} alt="sidebar" />
        <div className="up-svg-tooltip-text">close sidebar</div>
      </button>
      
      <Link to="/home">
        <button className="button outline">Home</button>
        {/* <div className="up-buttons flex"><div className="cntr">HOME</div></div> */}
      </Link>

      
      <div style={{ flex: 1 }}></div>
      <div className="up-buttons flex" style={{ backgroundColor: 'rgb(25, 85, 25)' }} onClick={runCode}><div className="cntr">RUN</div></div>
      
      
      <button className="up-buttons" onClick={toggleChatbot}>
            {isChatbotVisible ? "CLOSE AI" : "ASK AI"}
          </button>
      
      
      <div className="up-buttons flex" onClick={() => setInviteOpen(!inviteOpen)}>
      <div className="cntr">INVITE</div>
        {inviteOpen && (
          <div className="invite-dropdown flex-column">
            {/* Invite dropdown content */}
          </div>
        )}
      </div>
      <div className="up-svg-button flex" onClick={() => setNotificationOpen(!notificationOpen)}>
        <img src="notification-bing-svgrepo-com.svg" alt="Notification" />
        <div className="up-svg-tooltip-text">Notifications</div>
        {notificationOpen && (
          <div className="notification-dropdown flex-column">
            {/* Notification dropdown content */}
          </div>
        )}
      </div>
      <div className="up-svg-button flex">
        <img src="help-alt-svgrepo-com.svg" alt="help" />
        <div className="up-svg-tooltip-text">Help</div>
      </div>
      <div className="up-svg-button flex" onClick={() => setProfileOpen(!profileOpen)}>
        <img src="profile-round-1346-svgrepo-com.svg" alt="profile" />
        <div className="up-svg-tooltip-text">Profile</div>
        {profileOpen && (
          <div className="profile-dropdown flex-column">
            {/* Profile dropdown content */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
