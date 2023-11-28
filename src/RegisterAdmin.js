import React, { useState } from 'react';
import axios from 'axios';
import RegisterUser from './RegisterUser';
import './RegisterAdmin.css';
import { Link, Navigate } from 'react-router-dom';
import Layout from './NavbarA';

function RegisterAdmin() {
  const [emailAddress, setEmailAddress] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [registrationStatus, setRegistrationStatus] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async () => {
    if (!emailAddress || !password || !firstName ||!lastName ) {
      setErrorMessage('Fill in details');
      return;
    }

    try {
      // Send a POST request to your backend API to register the user
      const response = await axios.post('https://localhost:5001/api/Admin/api/admin/register', {
        firstName,
        lastName,
        emailAddress,
        password,
      });

      if (response.status === 200) {
        // Registration successful, update the registration status
        setRegistrationStatus('Registration done');
      }
    } catch (error) {
      // Handle registration error, e.g., duplicate email
      console.error('Registration failed:', error);
      setErrorMessage('Registration failed');
    }
  };

  return (
    <><div>
      <Layout />
    </div><div className="register-container">
        <h2>Admin Registration</h2>
        <form className="register-form">

          <div className="form-group">
            <label><b>First Name:</b></label>
            <br></br>
            <input
              type="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              style={{ width: '75%', height: '4vh' }}></input>
          </div>
          <div className="form-group">
            <label><b>Last Name:</b></label>
            <br></br>
            <input
              type="last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              style={{ width: '75%', height: '4vh' }} />
          </div>
          <div className="form-group">
            <label><b>Email Address:</b></label>
            <br></br>
            <input
              type="emailAddress"
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
              style={{ width: '75%', height: '4vh' }}></input>
          </div>
          <div className="form-group">
            <label><b>Password:</b></label>
            <br></br>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '75%', height: '4vh' }} />
          </div>
          <div className="form-group">
            <button type="button" onClick={handleRegister}>
              Register
            </button>
          </div>
        </form>
        {registrationStatus && <p>{registrationStatus}</p>}
        {errorMessage && <p style={{color: 'red'}}>{errorMessage}</p>}

      </div></>
    
  );
}

export default RegisterAdmin;
