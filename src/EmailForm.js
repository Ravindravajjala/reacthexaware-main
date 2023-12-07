import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Layout from './NavbarA';

export function EmailForm() {
  const [email, setEmail] = useState('');
  const [data, setData] = useState([]);
  const [emailOptions, setEmailOptions] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [noReviewsMessage, setNoReviewsMessage] = useState('');

  useEffect(() => {
    const fetchEmailOptions = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/Display/FetchAllEmails`);
        const jsonData = await response.json();
        setEmailOptions(jsonData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchEmailOptions();
  }, []);

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:5001/api/Display/AppNameAndReviewByEmail/${email}`);
      const jsonData = await response.json();

      if (jsonData.length === 0) {
        setNoReviewsMessage('No reviews to display.');
        setShowTable(false);
      } else {
        setData(jsonData);
        setShowTable(true);
        setNoReviewsMessage('');
      }

      console.log(jsonData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Layout />
      <div
        style={{
          backgroundImage: `url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwLG1Sv8cBZDec0BmDEMhWi3RpIjeuszsX1A&usqp=CAU")`,
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
          position: "absolute",
          top: "40",
          right: "0",
          transform: "translateY(0)",
          width: "100vw",
          height: "100vh",
          zIndex: "-1",
        }}
      />
      <div
        style={{
          textAlign: 'center',
          width: '100%',
          marginTop: '80px',
          position: 'relative',
          zIndex: "1",
        }}
      >
        <form onSubmit={handleSubmit}>
          <label>
            Email:
            <span style={{ marginLeft: '20px' }}></span>
            <select value={email} onChange={handleChange}>
              <option value="" disabled>Select an email</option>
              {emailOptions.map((emailOption, i) => (
                <option key={i} value={emailOption}>
                  {emailOption}
                </option>
              ))}
            </select>
          </label>
          &emsp;
          <button type="submit">Submit</button>
        </form>
        <br />
        <br />
        {noReviewsMessage && <p style={{ color: 'red' }}><b>{noReviewsMessage}</b></p>}
        {showTable && (
          <table style={{ width: '80%', margin: 'auto', borderCollapse: 'collapse' }}>
            <thead style={{ backgroundColor: '#f2f2f2' }}>
              <tr>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>App Name</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Review Content</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, i) => (
                <tr key={i} style={{ background: i%2 === 0 ? '#f9f9f9' : '#ffffff'}}>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.appName}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.reviewContent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default EmailForm;
