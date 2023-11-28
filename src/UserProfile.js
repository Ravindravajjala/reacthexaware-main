
// UserProfile.js
import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
 
const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loggedInEmail, setLoggedInEmail] = useState(localStorage.getItem('loggedInEmail') || '');
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/User/GetAllUsers');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
 
        // Find the user with the logged-in email
        const loggedInUser = data.find((user) => user.emailAddress === loggedInEmail);
 
        // Update the state with the user details
        setUser(loggedInUser);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
 
    if (loggedInEmail) {
      fetchData();
    }
  }, [loggedInEmail]);
 
  const togglePasswordVisibility = () => {
    // Toggle the password visibility for the logged-in user
    setUser((prevUser) => ({
      ...prevUser,
      showPassword: !prevUser.showPassword,
    }));
  };
 
  return (
    <div className="d-flex flex-column align-items-center mt-4">
      <div
          style={{
            backgroundImage: `url("https://static.vecteezy.com/system/resources/thumbnails/001/919/533/small/avatars-default-photo-placeholder-profile-pictures-vector.jpg")`,
            backgroundSize: "100% 100%",
            backgroundPosition: "center",
            position: "absolute",
            top: "40",
            right: "0",
            transform: "translateY(0)",
            width: "100vw", // Set width and height to cover the entire viewport
            height: "100vh",
            zIndex: "-1", // Ensure the background is behind other content
          }}
        />
        <Navbar /> <br></br><br></br>
      <h2 className="card-title" style={{ color: 'purple' }}>User Profile</h2><br></br>
      {user && (
        <div className="card" style={{ width: '18rem', backgroundColor: '#f8f9fa', color: '#343a40' }}>
          <div className="card-body">
            <div style={{ borderTop: '1px solid #ccc', marginTop: '10px' }}></div>
            <br></br>
            <p className="card-text">
              <strong>First Name:</strong> {user.firstName}
              <br />
              <strong>Last Name:</strong>  {user.lastName}
              <br />
              <strong>Email:</strong> {user.emailAddress}
              <br />
              <strong>Password:</strong>{' '}
              {user.showPassword ? user.password : '••••••••'}{' '}
            </p>
            <div style={{ borderTop: '1px solid #ccc', marginTop: '10px' }}></div>
            <br></br>
            <div className="d-flex justify-content-center"> {/* Center the button */}
              <button className="btn btn-primary" onClick={togglePasswordVisibility}>
                {user.showPassword ? 'Hide' : 'Show'} Password
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
 
export default UserProfile;
 