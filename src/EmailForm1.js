
// User EmailForm
 
import Navbar from './Navbar';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
 
export function EmailForm1() {
  const [email, setEmail] = useState('');
  const [data, setData] = useState([]);
  const [readOnlyEmail, setReadOnlyEmail] = useState(false);
  const [editingReview, setEditingReview] = useState(null); // Track the review being edited
  const [updatedReviewContent, setUpdatedReviewContent] = useState('');
  const [autoDisplayReviews, setAutoDisplayReviews] = useState(false); // New state to track auto display
 
  useEffect(() => {
    const loggedInEmail = localStorage.getItem('loggedInEmail');
    if (loggedInEmail) {
      setEmail(loggedInEmail);
      setReadOnlyEmail(true);
      setAutoDisplayReviews(true); // Set to true when the user is logged in
    }
  }, []);
 
  const handleChange = (event) => {
    if (!readOnlyEmail) {
      setEmail(event.target.value);
    }
  };
 
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:5001/api/Display/AppNameAndReviewByEmail/${email}`);
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.log(error);
    }
  };
 
  useEffect(() => {
    if (autoDisplayReviews) {
      handleSubmit(new Event('submit'));
    }
  }, [autoDisplayReviews]);
 
  return (
    <div
      style={{
        textAlign: 'center',
        width: '100%',
        marginTop: '80px',
      }}
    >
      <Navbar />
     
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
 
          <label>
            Email:
            <input
              type="text"
              value={email}
              placeholder="Enter email"
              onChange={handleChange}
              readOnly={readOnlyEmail}
              style={{ marginLeft: '10px', marginRight: '10px' }}
            />
          </label>
          &emsp;
          {/* <button type="submit">Submit</button> */}
       
        </form>
        {data.length === 0 ? (
          <div>
            <p style={{ fontWeight: 'bold', color: 'red' }}>No reviews to display....Start giving reviews</p>
            <Link to="/AddNewReview1" href="RegisterAdmin" style={{ fontSize: '22px', fontWeight: 'bold' }}>Click Here</Link>
          </div>
        ) : (
          <table className="table table-bordered" style={{ width: '70%' }}>
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
                  <td>
                    {editingReview === item.id ? (
                      <input
                        type="text"
                        value={updatedReviewContent}
                        onChange={(e) => setUpdatedReviewContent(e.target.value)}
                      />
                    ) : (
                      item.reviewContent
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
 
export default EmailForm1;
 