import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

export function AppReviews() {
  const [appName, setAppName] = useState('');
  const [data, setData] = useState([]);
  const [appList, setAppList] = useState([]); // State to store the list of available apps
  const [message, setMessage] = useState(''); // State for displaying messages

  const handleAppNameChange = (event) => {
    setAppName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (appName) {
        const response = await fetch(`https://localhost:5001/api/Display/AppNameAndReview/${appName}`);
        const jsonData = await response.json();
        setData(jsonData);

        if (jsonData.length === 0) {
          setMessage(`No reviews available for "${appName}"`);
        } else {
          setMessage('');
        }
      } else {
        setMessage('Please select an app name');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Fetch the list of available apps when the component mounts
    async function fetchAppList() {
      try {
        const response = await fetch('https://localhost:5001/api/App/GetAllApps');
        const jsonData = await response.json();
        setAppList(jsonData);
      } catch (error) {
        console.log(error);
      }
    }

    fetchAppList();
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            App Name:
            {/* Use a dropdown select for app names */}
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
        {/* Display the message */}
        {message && <p>{message}</p>}
        {/* Display the table of reviews */}
        <table border='1' className="table table-bordered">
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

        <img
    src="https://feedbacklabs.org/wp-content/uploads/2022/03/iStock-1162565459-scaled-e1647543580694-2022x1011.jpg"
    alt=""
  style={{
    width: '350px',   
    height: '670px',  
    position: 'absolute',
    bottom: '0',
    left: '90%',      
    transform: 'translateX(-50%)' ,
    marginTop: "80px"
  }}
/>
<button style= {{ position: "absolute", top: "50px", left:"60px"}}><Link to="/">Back</Link></button>
      </div>
      <button style= {{ position: "absolute", top: "50px", left:"60px"}}><Link to="/NavbarA">Back</Link></button>
    </div>
  );
}

export default AppReviews;
