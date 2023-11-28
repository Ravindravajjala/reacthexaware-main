import React from 'react';
import { Link } from "react-router-dom";
import Layout from './Navbar';
import './logoutA.css';

function UserLogout() {
  const handleLogout = () => {
    // Perform logout actions (e.g., clearing user data or tokens)
    // Redirect the user to the login page
    window.location.href = '/Home'; // You can also use React Router for navigation
  };

  return (
    <div  className="logout-container">
      <Layout/>
      <h2>Logout</h2>
      <p>Are you sure you want to log out?</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default UserLogout;
