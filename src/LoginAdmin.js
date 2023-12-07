import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
//import './LoginAdmin.css';
import AdminLogout from './AdminLogout';
import RegisterAdmin from './RegisterAdmin';
import NavbarA from './NavbarA';

export function LoginAdmin() {
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  
  const navigate = useNavigate(); // Use the useNavigate hook for navigation

  const handleLogin = async () => {
    if (!emailAddress || !password) {
      setError('Fill in details');
      return;
    }

    try {
      const allAdminDetails = await getAllAdminDetails();

      if (allAdminDetails) {
        // Check if the entered email and password match any admin details
        const admin = allAdminDetails.find(
          (admin) => admin.emailAddress === emailAddress && admin.password === password
        );

        if (admin) {
          // Authentication successful
          setIsAdminAuthenticated(true);
          setError('');
          navigate('/NavbarA'); // Navigate to the admin's navbar page (NavbarA)
        } else {
          // Authentication failed
          setError('Invalid email or password. Please try again.');
        }
      } else {
        // Admin details not found, ask to register
        setError('Admin details not found. Please register.');
      }
    } catch (error) {
      // Handle API request errors here
      setError('An error occurred while logging in.');
    }
  };

  const getAllAdminDetails = async () => {
    try {
      // Make an API call to your backend to fetch all admin details
      const response = await fetch('http://localhost:5001/api/Admin/login');
      console.log(response);
      if (response.ok) {
        const adminDetails = await response.json();
        return adminDetails;
      } else {
        throw new Error('API request failed');
      }
    } catch (error) {
      throw error;
    }
  };

  const handleRegister = () => {
    // Redirect to the registration page or perform any other action
    // Replace this with your desired navigation logic
    window.location.href = '/RegisterAdmin'; // Change the URL to your registration page
  };

  return (
    <div className="login-container">
      <h2>Login Admin</h2>
      
      {isAdminAuthenticated ? (
        // If admin is authenticated, render the NavbarA component
        <NavbarA userRole="admin" />
      ) : (
        <div className="login-form">
          {error && <p className="error">{error}</p>}
          <form>
            <div className="form-group">
              <label htmlFor="emailAddress">Email Address:</label>
              <input
                type="emailAddress"
                id="emailAddress"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <span style={{ marginLeft: '10px' }}></span>
            <div className="button-group">
              <button type="button" onClick={handleLogin}>
                Login
              </button>
              <span style={{ marginLeft: '20px' }}></span> {/* Add margin between buttons */}
              <button type="button" onClick={handleRegister}>
                Register
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
export default LoginAdmin;
