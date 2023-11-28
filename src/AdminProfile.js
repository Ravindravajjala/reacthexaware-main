
// AdminProfile.js
import React, { useEffect, useState } from 'react';
import Layout from './NavbarA';
import NavbarA from './NavbarA';
 
const AdminProfile = () => {
  const [admin, setAdmin] = useState(null);
  const [loggedInEmail, setLoggedInEmail] = useState(localStorage.getItem('loggedInEmail') || '');
  const [authenticated, setAuthenticated] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try 
      {
        if(!loggedInEmail){
          setAuthenticated(false);
          return;
        }
        const response = await fetch('http://localhost:5001/api/Admin/GetAllAdmins');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('API Response:', data);
 
        // Assuming there's a unique identifier for admins, use it to find the logged-in admin
        const loggedInAdmin = data.find((admin) => admin.emailAddress === loggedInEmail);
        console.log('Logged In Admin:', loggedInAdmin);
 
        // Update the state with the admin details
        setAdmin(loggedInAdmin);
      } catch (error) {
        console.error('Error fetching admin data:', error);
      }
    };
 
    if (loggedInEmail) {
      fetchData();
    }
  }, [loggedInEmail]);
 
  const togglePasswordVisibility = () => {
    // Toggle the password visibility for the logged-in admin
    setAdmin((prevAdmin) => ({
      ...prevAdmin,
      showPassword: !prevAdmin.showPassword,
    }));
  };
 
  return (

    <div>
          <Layout />
   
    <div className="d-flex flex-column align-items-center mt-4">
        <div
          style={{
            backgroundImage: `url("https://static.vecteezy.com/system/resources/thumbnails/001/919/533/small/avatars-default-photo-placeholder-profile-pictures-vector.jpg")`,
            backgroundSize: "100% 100%",
            backgroundPosition: "center",
            position: "absolute",
            top: "",
            right: "0",
            transform: "translateY(0)",
            width: "100vw", // Set width and height to cover the entire viewport
            height: "100vh",
            zIndex: "-1", // Ensure the background is behind other content
          }}
        />

        
      
      <h2 className="card-title" style={{ color: 'purple' }}>Admin Profile</h2><br></br>
      {admin && (
        <div className="card" style={{ width: '18rem', backgroundColor: '#f8f9fa', color: '#343a40' }}>
          <div className="card-body">
            <div style={{ borderTop: '1px solid #ccc', marginTop: '10px' }}></div>
            <br></br>
            <p className="card-text">
              <strong>First Name:</strong> {admin.firstName}
              <br />
              <strong>Last Name:</strong>  {admin.lastName}
              <br />
              <strong>Email:</strong> {admin.emailAddress}
              <br />
              <strong>Password:</strong>{' '}
              {admin.showPassword ? admin.password : '••••••••'}{' '}
            </p>
            <div style={{ borderTop: '1px solid #ccc', marginTop: '10px' }}></div>
            <br></br>
            <div className="d-flex justify-content-center"> {/* Center the button */}
              <button className="btn btn-primary" onClick={togglePasswordVisibility}>
                {admin.showPassword ? 'Hide' : 'Show'} Password
              </button>
            </div>
          </div>
        </div>
       
      )}
     
    
    </div>
    </div>
 
   
  );
 
};
 
export default AdminProfile;
 