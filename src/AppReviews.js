
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from './NavbarA';
 
export function AppReviews() {
  const [appName, setAppName] = useState('');
  const [data, setData] = useState([]);
  const [appList, setAppList] = useState([]);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
 
  const handleAppNameChange = (event) => {
    setAppName(event.target.value);
  };
 
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (appName) {
        const response = await fetch(
          `http://localhost:5001/api/Display/AppNameAndReview/${appName}`
        );
        const jsonData = await response.json();
        setData(jsonData);
 
        if (jsonData.length === 0) {
          setMessage(`No reviews available for "${appName}"`);
        } else {
          setMessage('');
        }
 
        // Set submitted to true after successful form submission
        setSubmitted(true);
      } else {
        setMessage('Please select an app name');
      }
    } catch (error) {
      console.log(error);
    }
  };
 
  useEffect(() => {
    async function fetchAppList() {
      try {
        const response = await fetch('http://localhost:5001/api/App/GetAllApps');
        const jsonData = await response.json();
        setAppList(jsonData);
      } catch (error) {
        console.log(error);
      }
    }
 
    fetchAppList();
  }, []);
 
  return (
    <><Layout /><div className="d-flex justify-content-center align-items-center vh-100">

      <div>
        <form onSubmit={handleSubmit}>
          <label>
            <br />
            <br />
            <br />
            <br />
            
            App Name:
            <span style={{ marginLeft: '15px' }}></span>

            <select value={appName} onChange={handleAppNameChange}>
              <option value="">Select an app...</option>
              {appList.map((app) => (
                <option key={app.appId} value={app.appName}>
                  {app.appName}
                </option>
              ))}
            </select>
          </label>
          &emsp;
          <button type="submit">Submit</button>
        </form>
        <br />
        <br />

        {message && <p style={{ color: 'red' }}>{message}</p>}

        {submitted && data.length > 0 && (
          <table border="1" className="table table-bordered">
            <thead>
              <tr>
                <th>App Name</th>
                <th>Review Content</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, i) => (
                <tr key={i}>
                  <td>{item.appName}</td>
                  <td>{item.reviewContent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        </div>

       
      
    </div>
     {/* <img
          src="https://feedbacklabs.org/wp-content/uploads/2022/03/iStock-1162565459-scaled-e1647543580694-2022x1011.jpg"
          alt=""
          style={{
            width: '350px',
            height: '670px',
            position: 'absolute',
            bottom: '0',
            left: '90%',
            transform: 'translateX(-50%)',
            marginTop: '80px',
          }} /> */} </> 
  );
}
 
export default AppReviews;
 