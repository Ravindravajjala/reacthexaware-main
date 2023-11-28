import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RegisterUser from './RegisterUser';
//import './LoginAdmin.css';

function LoginUser() {
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [showFillDetailsMessage, setShowFillDetailsMessage] = useState(false);

  const navigate = useNavigate(); // Use the useNavigate hook for navigation

  const handleLogin = async () => {
    if (!emailAddress || !password) {
      setShowFillDetailsMessage(true);
      return;
    }

    try {
      const allUserDetails = await getAllUserDetails();

      if (allUserDetails) {
        // Check if the entered email and password match any user details
        const user = allUserDetails.find(
          (user) => user.emailAddress === emailAddress && user.password === password
        );

        if (user) {
          // Authentication successful
          setIsUserAuthenticated(true);
          setError('');
          navigate('/navbar'); // Navigate to the navbar page
        } else {
          // Authentication failed, show error message
          setError('Invalid email or password.');
        }
      } else {
        // User details not found, ask to register
        setError('User details not found. Please register.');
      }
    } catch (error) {
      // Handle API request errors here
      setError('An error occurred while logging in.');
    }
  };
 const getAllUserDetails = async () => {
    try {
      // Make an API call to your backend to fetch all user details
      const response = await fetch('https://localhost:5001/api/User/GetAllUsers');
      if (response.ok) {
        const userDetails = await response.json();
        return userDetails;
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
    window.location.href = '/RegisterUser'; // Change the URL to your registration page
  };


  // Rest of your component code...

  return (
    <div className="login-container">
      <h2>Login User</h2>
      
      {isUserAuthenticated ? (
        <p>You are logged in as user.</p>
      ) : (
        <div className="login-form">
          {showFillDetailsMessage && <p className="error">Fill in details</p>}
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
              <span style={{ marginLeft: '20px' }}></span>
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

export default LoginUser;
