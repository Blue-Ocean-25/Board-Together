import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import useVerifyLogin from './utils/useVerifyLogin.jsx';
import AddFriendDropdown from './friends/AddFriendDropdown.jsx';

const NavBar = ({ friends, setFriends }) => {
  const { loggedIn, email } = useVerifyLogin(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    axios.put('/api/logOut')
      .then(() => navigate('/login'))
      .catch(err => console.error(err)) //make a swal if the server has an error
  }

  const handleNotification = () => {
    Swal.fire({
      buttonsStyling: false,
      icon: 'info',
      background: "#ffdba6",
      customClass: {
        popup: 'bg-base-200 text-base-content rounded-lg shadow-xl',
        icon: 'mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-base-100 mt-5',
        title: 'text-lg font-bold text-center mt-3',
        htmlContainer: 'text-sm text-gray-500 mt-2 text-center',
        confirmButton: 'btn btn-accent',
      },
      title: 'Future Implementation',
      text: 'This feature will be implemented in the future. Stay tuned for updates!',
    });
  };
  return (
    <div className="navbar bg-base-200 shadow-sm fixed top-0 left-0 w-full z-10">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /> </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-300 rounded-box z-1 mt-3 w-52 p-2 shadow">
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/">Home page</Link></li>
            <li><Link to="/selection">Selection page</Link></li>
            {loggedIn ? <li><button onClick={handleLogout}>Logout</button></li> : <li><Link to="/login">Login</Link></li>}
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <Link to="/" className="btn btn-ghost text-xl">Board Together</Link>
      </div>
      <div className="navbar-end">
        {location.pathname === '/profile' &&
          <div className="friends">
            <AddFriendDropdown
              friends={friends}
              setFriends={setFriends}
              email={email} />
          </div>
        }
        <button onClick={handleNotification} className="btn btn-ghost btn-circle">
          <div className="indicator">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /> </svg>
            <span className="badge badge-xs badge-primary indicator-item"></span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default NavBar;