import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from './NavbarA';

// ReviewCard component to display individual review
const ReviewCard = ({ appName, numberOfReviews }) => {
  const getRandomColor = () => {
    const colors = ["#FFD700", "#90EE90", "#87CEEB", "#FFA07A", "#C71585"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const cardStyle = {
    border: "1px solid #ccc",
    padding: "20px",
    margin: "20px",
    width: "300px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: getRandomColor(),
    textAlign: "center",
  };

  const headingStyle = {
    fontSize: "1.5em",
    marginBottom: "10px",
  };

  return (
    <div style={cardStyle}>
      <h5 style={headingStyle}>AppName: {appName}</h5>
      <p>Reviews: {numberOfReviews}</p>
    </div>
  );
};

export function Review() {
  const [apps, setApps] = useState([]);

  const fetchReview = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/Display/AppNameandItsReviews');
      const jsonData = await response.json();
      console.log(jsonData);
      setApps(jsonData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchReview();
  }, []);

  return (
    <div style={{
      backgroundImage: 'url("https://assets.reviews.io/img/all-global-assets/og-images/og-review-global.jpg")', // Replace with the path to your image
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      minHeight: '100vh',
      position: 'relative',
    }}>
      <h2 align='center'><br/><br/><br/><b>Welcome to TrustspotApp</b></h2>
      <h4 align='center'><br/><b>Here are the available apps and number of reviews..</b></h4>
      <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
        {apps.map((item, i) => (
          <ReviewCard key={i} appName={item.appName} numberOfReviews={item.number_of_reviews} />
        ))}
      </div>
      <div style={{ position: "absolute", top: "40px", right: "80px" }}>
        <Link to="/Home" style={{ textDecoration: "none", color: "#fff" }}>
          <button style={{ padding: "10px", width: "150px", fontSize: "1.2em", backgroundColor: "#0000FF", color: "#fff", border: "none", borderRadius: "4px" }}>
            SignIn
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Review;
