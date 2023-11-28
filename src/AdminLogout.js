import React from 'react';
import { Link } from "react-router-dom";
import './logoutA.css';
import Layout from './NavbarA';

function AdminLogout() {
  const handleLogout = () => {
    // Perform logout actions (e.g., clearing user data or tokens)
    // Redirect the user to the login page
    window.location.href = '/Home'; // You can also use React Router for navigation
  };

  return (
    <div>
    <Layout/>
    <div className="logout-container">
      <h1>Logout</h1>
      <h2>Are you sure you want to log out?</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
    </div>
  );
}

export default AdminLogout;


