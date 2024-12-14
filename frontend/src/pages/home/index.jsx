import React,{useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/App.css';
import '../../styles/home.css';

import {
  Home, User, Bell, MessageCircle, Settings, Search, SquarePlusIcon,
} from 'lucide-react';
// import CreateModal from '../../components/modals/cre';
import { logoutUser } from '../../redux/actions/userActions.js';
import { useDispatch, useSelector } from 'react-redux';
import LogoutModal from '../../components/modals/logoutModal.jsx';

import img from "./js.png";
import img1 from "./lin.png";
// import img2 from "./logo.svg";
import img3 from "./mac.png";
import img4 from "./noti.png";
import img5 from "./noti1.png";
import img6 from "./python.png";
import img7 from "./wind.png";

import avatar1 from "../../assets/avatar/avatar1.png";
import avatar2 from "../../assets/avatar/avatar2.png";
import avatar3 from "../../assets/avatar/avatar3.png";
import avatar4 from "../../assets/avatar/avatar4.png";


function Sidebar() {
  return (
    <div className="sidebar">
      <h5>DevMerge</h5>
      <a href="#">Create Projects</a>
      <a href="#">Import from GitHub</a>
      <hr />
      <h5>Home</h5>
      <a href="#">Merge</a>
      <a href="#">Deployments</a>
      <a href="#">Usage</a>
      <a href="#">Teams</a>
      <hr />
      <h5>Explore DevMerge</h5>
      <a href="#">Bounties</a>
      <a href="#">Templates</a>
      <a href="#">Extensions</a>
      <a href="#">Learn</a>
      <a href="#">Documentation</a>
      {/* <button className="join-button">Join Merge Core</button>
      <p>Install DevMerge on</p>
      <div className="install-buttons">
        <button><img src={img7} alt="Windows" /></button>
        <button><img src={img3} alt="Mac" /></button>
        <button><img src={img1} alt="Linux" /></button>
      </div> */}
    </div>
  );
}

function Header() {
  const [isOpen, setIsOpen] = useState(true);

  // const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openLogoutModal, setOpenLogoutModal] = useState(false);
  
  const navigate= useNavigate();
  const dispatch = useDispatch();

  const { user, userLoading } = useSelector(state => state.userAuth)
  const { isAuthenticated } = useSelector(state => state.userAuth);

  const handleLogoutOpenModal = () => {
    setOpenLogoutModal(true);
    // dispatch(logoutUser());
  }

  // const handleCloseModal = (e) => {
  //   // e.stopPropagation(); // Prevent event bubbling
  //   setOpenCreateModal(false);
  //   onClose(false);
  // };

  const handleLogoutCloseModal = (e) => {
    // e.stopPropagation(); // Prevent event bubbling
    setOpenLogoutModal(false);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  }

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (openLogoutModal) {
        document.body.style.overflow = "hidden"; // Disable scroll
    } else {
        document.body.style.overflow = ""; // Restore scroll
    }

    // Cleanup when the component unmounts
    return () => {
        document.body.style.overflow = "";
    };
}, [openLogoutModal]);

  // const goTOlogin = () =>{
  //   navigate('/login');
  // };

  const [currentAvatar, setCurrentAvatar] = useState(avatar1);
  const [showAvatarOptions, setShowAvatarOptions] = useState(false);

  // List of available avatars
  const avatarOptions = [avatar1,avatar2, avatar3, avatar4];

  // Toggle visibility of avatar options
  const toggleAvatarOptions = () => {
    setShowAvatarOptions(!showAvatarOptions);
  };

  // Change avatar on selection
  const selectAvatar = (newAvatar) => {
    setCurrentAvatar(newAvatar);
    setShowAvatarOptions(false); // Close options after selection
  };
    // Close avatar options if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const avatarOptionsBox = document.querySelector('.avatar-options');
      const avatarImage = document.querySelector('.avatar');

      // Ensure elements are not null before calling contains
      if (
        avatarOptionsBox &&
        avatarImage &&
        !avatarOptionsBox.contains(event.target) &&
        !avatarImage.contains(event.target)
      ) {
        setShowAvatarOptions(false);
      }
    };

    // Add event listener to document to listen for clicks
    document.addEventListener('click', handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="header">
      <div className="user">
        {/* <img src="https://avatars.githubusercontent.com/u/74308275?v=4" alt="User" /> */}
        <img src={currentAvatar} alt="User" onClick={toggleAvatarOptions} />
        {showAvatarOptions && (
          <div
            className="avatar-options"
            style={{
              position: 'absolute',
              top: '50px',
              left: '10px',
              backgroundColor: 'black',
              border: 'none',
              padding: '10px',
              borderRadius: '8px',
              zIndex: 1000,
            }}
          >
            {avatarOptions.map((avatar, index) => (
              <img
                key={index}
                src={avatar}
                alt={`Option ${index + 1}`}
                onClick={() => selectAvatar(avatar)}
                style={{
                  cursor: 'pointer',
                  width: '50px',
                  height: '50px',
                  margin: '5px',
                  borderRadius: '50%',
                }}
              />
            ))}
          </div>
        )}     
      </div>
      <div className="search">
        <input type="text" placeholder="Search & run commands" />
      </div>
      <div className="buttons">
        <button>Ctrl</button>
        <button>+</button>
        <button><img src={img5} alt="Notifications" /></button>
        <button>?</button>
        <button onClick={handleLogoutOpenModal}>Logout</button>
        {/* <div className="logout-section" onClick={handleLogoutOpenModal}>
                <Link href="#" className="menu-link">
                <User className="menu-icon" />
                  {userLoading === false && <span className="menu-text">{user?.username}</span>}
                </Link>
            </div> */}
      </div>
      
        {openLogoutModal && (
            <div className="overlay" onClick={handleLogoutCloseModal}>
                <div
                    className="modal-content"
                    onClick={(e) => e.stopPropagation()}
                >
                    <LogoutModal onClose={handleLogoutCloseModal} onConfirm={handleLogout} />
                </div>
            </div>
            
            )
        }

    </div>
  );
}

function CreateRepls() {
  //to navigate
  const navigate= useNavigate();

  const goTOWebEditor = () =>{
    navigate('/webEditor');
  };

  const goTOCodeEditor = () =>{
    navigate('/codeEditor');
  };

  return (
    <div className="create-repls">
      <button className="create-code-button" onClick={goTOWebEditor}>WEB-EDITOR</button>
      <button className="create-code-button" onClick={goTOCodeEditor}>CODE-EDITOR</button>
      {/* <button className="create-nodejs-button">
        <img src={img} alt="Node.js" /> Create Node.js
        </button> */}
    </div>
  );
}

function RecentRepls() {
  const navigate= useNavigate();

  const goPremium = () =>{
    navigate('/payment');
  };

  return (
    <div>
    <div className="recent-repls">
      <h3>Recent Merg's</h3>
      <div className="repls">
        <div className="repl">
          <h4>You don't have any Mergs</h4>
          <p>Start creating!</p>
        </div>
      </div>
      {/* <button className="customize-button">Customize Home</button> */}
      {/* <select className="all-repls-dropdown" style={{ backgroundColor: '#44474d' }}>
        <option value="all">All Merg's</option>
      </select> */}
    </div>
      <button className="create-code-button" onClick={goPremium}>BUY PREMIUM</button>
    </div>
  );
}

const Homee = () => {
  return (
    <div className="container">
      <Sidebar />
      <div className="content">
        <Header />
        <CreateRepls />
        <RecentRepls />
      </div>
    </div>
  );
}

export default Homee