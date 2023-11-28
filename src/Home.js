import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Home.css';

function App() {
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');

  const navigate = useNavigate(); 
  const handleLogin = async () => {
    if (!emailAddress || !password) {
      setLoginMessage('Fill in both email and password');
      return;
    }

    try {
      const adminResponse = await fetch('http://localhost:5001/api/Admin/GetAllAdmins');
      const userResponse = await fetch('http://localhost:5001/api/User/GetAllUsers');

      if (adminResponse.ok && userResponse.ok) {
        const adminData = await adminResponse.json();
        const userData = await userResponse.json();

        const isAdmin = adminData.some((admin) => admin.emailAddress === emailAddress && admin.password === password);
        const isUser = userData.some((user) => user.emailAddress === emailAddress && user.password === password);

        if (isAdmin) {
          // Store the email address in localStorage or a state management solution
          localStorage.setItem('loggedInEmail', emailAddress);
          window.location.href = '/HomeAdmin'; 
        } else if (isUser) {
          // Store the email address in localStorage or a state management solution
          localStorage.setItem('loggedInEmail', emailAddress);
          window.location.href = '/HomeUser'; 
        } else {
          setLoginMessage('Invalid email or password');
        }
      } else {
        setLoginMessage('Invalid email or password');
      }
    } catch (error) {
      setLoginMessage('An error occurred while logging in');
    }
  };

  const handleRegisterClick = () => {
    navigate('/RegisterUser'); 
  };

  return (
    <div className="login-container">
      <div className="login-column">
        <h2>Login</h2>
        <div>
          <input
            type="email"
            placeholder="EmailAddress"
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
            style={{ width: '150%', height:'6vh'}}
          />
          </div>
        
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{width: '150%', height:'6vh'}}
          />
        </div>
        <div className="button-container">
          <button onClick={handleLogin}>Login</button>
          <button onClick={handleRegisterClick}>Register</button> 
        </div>
        <p style={{color: 'red'}}>{loginMessage}</p>
      </div>
    </div>
  );
}

export default App;